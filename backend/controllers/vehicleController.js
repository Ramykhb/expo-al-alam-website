import {
    addVehicleToDB,
    deleteVehicleById,
    getAllVehiclesFromDB,
    getVehicleById,
    updateVehicleById,
} from "../services/vehicleService.js";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "vehicles");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

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
            return res
                .status(404)
                .json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, car });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const addVehicle = async (req, res) => {
    try {
        const { mainImageIndex } = req.body;

        const imagePaths = [];

        req.files.forEach((file, index) => {
            const ext = path.extname(file.originalname);
            const filename = `${Date.now()}-${index}${ext}`;
            const filepath = path.join(UPLOAD_DIR, filename);

            fs.writeFileSync(filepath, file.buffer);

            imagePaths.push(`/uploads/vehicles/${filename}`);
        });

        const mainIndex = parseInt(mainImageIndex, 10) || 0;
        const [mainImage] = imagePaths.splice(mainIndex, 1);
        imagePaths.unshift(mainImage);

        await addVehicleToDB(req.body, imagePaths);

        res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to add vehicle",
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
