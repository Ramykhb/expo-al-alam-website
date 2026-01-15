import express from "express";
import { generateContactEmail, sendEmail } from "./utils/sendMail.js";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import { frontendPath } from "./config/frontConfig.js";
import vehicleRouter from "./routers/vehicleRouter.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: frontendPath,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);

app.use("/api/vehicles", vehicleRouter);

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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
