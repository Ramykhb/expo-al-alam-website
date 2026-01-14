import express from "express";
import {
    checkSignup,
    authenticateToken,
    authenticateRefreshToken,
    checkLogin,
    checkPasswordUpdate,
} from "../middleware/authMiddleware.js";
import {
    changePassword,
    checkStatus,
    login,
    logout,
    refreshToken,
    signup,
    getUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/signup", checkSignup, signup);

authRouter.post("/login", checkLogin, login);

authRouter.put(
    "/update-password",
    authenticateToken,
    checkPasswordUpdate,
    changePassword
);

authRouter.get("/status", checkStatus);

authRouter.post("/refresh", authenticateRefreshToken, refreshToken);

authRouter.post("/logout", logout);

export default authRouter;
