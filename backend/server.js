import express from "express";
import { generateContactEmail, sendEmail } from "./utils/sendMail.js";
import cors from "cors";
import multer from "multer";
import pool from "./database/dbConfig.js";
import authRouter from "./routers/authRouter.js";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

const upload = multer();

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "vehicles");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const htmlContent = generateContactEmail(name, email, message);
        await sendEmail({
            to: process.env.EMAIL_RECEIVER,
            subject: "New Contact Inquiry",
            html: htmlContent,
        });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error("Contact error:", error);

        return res.status(500).json({
            success: false,
            error: "Failed to send email",
        });
    }
});

app.get("/api/vehicles/:carId", async (req, res) => {
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

app.post("/api/add-vehicle", upload.array("images"), async (req, res) => {
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
});

app.get("/api/vehicles", async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
