import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import pool from "../database/dbConfig.js";

const vehicleRouter = express.Router();

const upload = multer();

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "vehicles");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

vehicleRouter.use(express.json());

vehicleRouter.get("/:carId", async (req, res) => {
    const { carId } = req.params;

    try {
        const [rows] = await pool.query("SELECT * FROM Cars WHERE id = ?", [
            carId,
        ]);

        if (rows.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Car not found" });
        }

        const car = rows[0];
        res.json({ success: true, car });
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

vehicleRouter.post(
    "/add-vehicle",
    authenticateToken,
    upload.array("images"),
    async (req, res) => {
        try {
            const {
                name,
                brand,
                series,
                year,
                price,
                mileage,
                power,
                transmission,
                exterior,
                interior,
                mainImageIndex,
            } = req.body;

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No images uploaded",
                });
            }

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

            const query = `
            INSERT INTO Cars (
                name, brand, series, year, price, mileage, power,
                transmission, exterior_color, interior_color, image_links
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

            await pool.query(query, [
                name,
                brand,
                series,
                year,
                price,
                mileage,
                power,
                transmission,
                exterior,
                interior,
                JSON.stringify(imagePaths),
            ]);

            res.status(201).json({
                success: true,
                message: "Vehicle added successfully",
            });
        } catch (error) {
            console.error("Add vehicle error:", error);
            res.status(500).json({
                success: false,
                error: "Failed to add vehicle",
            });
        }
    }
);

vehicleRouter.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM Cars WHERE id = ?", [
            id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json({
            message: "Vehicle successfully removed from vault",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during deletion" });
    }
});

vehicleRouter.get("", async (req, res) => {
    try {
        const [cars] = await pool.query(`
            SELECT 
                id, name, brand, series, year, price, 
                mileage, power, transmission, exterior_color, 
                interior_color, image_links 
            FROM Cars 
            ORDER BY created_at DESC
        `);

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
        console.error("Database Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve the collection from the vault.",
        });
    }
});

vehicleRouter.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const result = await pool.query(
            `UPDATE Cars SET 
                name = ?, brand = ?, series = ?, year = ?, price = ?, 
                mileage = ?, power = ?, transmission = ?, 
                exterior_color = ?, interior_color = ? 
            WHERE id = ?`,
            [
                updateData.name,
                updateData.brand,
                updateData.series,
                updateData.year,
                updateData.price,
                updateData.mileage,
                updateData.power,
                updateData.transmission,
                updateData.exterior_color,
                updateData.interior_color,
                id,
            ]
        );

        const [updatedRows] = await pool.query(
            "SELECT * FROM Cars WHERE id = ?",
            [id]
        );

        const updatedVehicle = updatedRows[0];

        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({
            message: "Vehicle updated successfully",
            car: updatedVehicle,
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Failed to update vehicle details" });
    }
});

export default vehicleRouter;
