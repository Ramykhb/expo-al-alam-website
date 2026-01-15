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
import {
    addVehicleMiddleWare,
    singleVehicleMiddleWare,
    updateVehicleMiddleware,
} from "../middleware/vehicleMiddleware.js";

const vehicleRouter = express.Router();

const upload = multer();

vehicleRouter.use(express.json());

vehicleRouter.get("/", getAllVehicles);

vehicleRouter.get("/:id", singleVehicleMiddleWare, getSingleVehicle);

vehicleRouter.post(
    "/add-vehicle",
    authenticateToken,
    upload.array("images"),
    addVehicleMiddleWare,
    addVehicle
);

vehicleRouter.delete(
    "/:id",
    authenticateToken,
    singleVehicleMiddleWare,
    deleteVehicle
);

vehicleRouter.put(
    "/:id",
    authenticateToken,
    updateVehicleMiddleware,
    updateVehicle
);

export default vehicleRouter;
