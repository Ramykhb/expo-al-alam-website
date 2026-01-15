import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import {
    addVehicle,
    deleteVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
} from "../controllers/vehicleController.js";

const vehicleRouter = express.Router();

const upload = multer();

vehicleRouter.use(express.json());

vehicleRouter.get("/:carId", getSingleVehicle);

vehicleRouter.post(
    "/add-vehicle",
    authenticateToken,
    upload.array("images"),
    addVehicle
);

vehicleRouter.delete("/:id", authenticateToken, deleteVehicle);

vehicleRouter.get("/", getAllVehicles);

vehicleRouter.put("/:id", authenticateToken, updateVehicle);

export default vehicleRouter;
