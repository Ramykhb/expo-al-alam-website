import {
  addVehicleToDB,
  deleteVehicleById,
  getAllVehiclesFromDB,
  getVehicleById,
  updateVehicleById,
} from "../services/vehicleService.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const addVehicle = async (req, res) => {
  try {
    const { mainImageIndex } = req.body;

    const uploadPromises = req.files.map(async (file, index) => {
      const ext = path.extname(file.originalname);
      const filename = `vehicles/${Date.now()}-${index}${ext}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return `${process.env.R2_PUBLIC_URL}/${filename}`;
    });

    const imagePaths = await Promise.all(uploadPromises);

    const mainIndex = parseInt(mainImageIndex, 10) || 0;
    if (imagePaths[mainIndex]) {
      const [mainImage] = imagePaths.splice(mainIndex, 1);
      imagePaths.unshift(mainImage);
    }

    await addVehicleToDB(req.body, imagePaths);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully to R2",
    });
  } catch (error) {
    console.error("R2 Upload Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload to cloud storage",
    });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVehicleById(id);

    if (!result) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({
      message: "Vehicle successfully removed from vault",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during deletion" });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedVehicle = await updateVehicleById(id, updateData);

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      car: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle details" });
  }
};

export const getSingleVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await getVehicleById(id);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.json({ success: true, car });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const cars = await getAllVehiclesFromDB();
    const formattedCars = cars.map((car) => ({
      ...car,
      image_links:
        typeof car.image_links === "string"
          ? JSON.parse(car.image_links)
          : car.image_links,
    }));

    res.status(200).json({
      success: true,
      count: formattedCars.length,
      cars: formattedCars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve the collection from the vault.",
    });
  }
};
