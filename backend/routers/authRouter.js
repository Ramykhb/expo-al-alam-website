import express from "express";
import {
    checkSignup,
    authenticateToken,
    authenticateRefreshToken,
    checkLogin,
    checkProfileEdit,
    checkPasswordUpdate,
    checkGetProfile,
    checkSearchInput,
    checkEmailReset,
    authenticateForgetToken,
    checkResetPassword,
} from "../middleware/authMiddleware.js";
import {
    changePassword,
    checkStatus,
    login,
    logout,
    refreshToken,
    signup,
    getProfile,
    getProfiles,
    getUser,
    editProfile,
    accountDeletion,
    forgetPassword,
    checkForgetToken,
    resetPassword,
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

authRouter.get("/user", authenticateToken, getUser);

authRouter.post("/refresh", authenticateRefreshToken, refreshToken);

authRouter.post("/logout", logout);

authRouter.delete("/delete-account", authenticateToken, accountDeletion);

export default authRouter;
