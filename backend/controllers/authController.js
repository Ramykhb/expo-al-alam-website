import {
  addUser,
  deleteRefreshTokenFromDB,
  generateAccessToken,
  generateRefreshToken,
  insertToken,
  updatePassword,
  getID,
} from "../services/authService.js";
import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const username = req.body.username.toLowerCase();
  try {
    const accessToken = generateAccessToken({
      username: username,
    });
    const refreshToken = generateRefreshToken({
      username: username,
    });
    const result = await addUser(req.body);
    const success = await insertToken(username, refreshToken);
    if (success) {
      return res.status(201).json({
        message: "User created successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: result.insertId,
      });
    } else {
      return res.status(500).json({
        error: "ServerError",
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      message: "Something went wrong",
    });
  }
};

export const checkStatus = (req, res) => {
  const refreshToken = req.query.refreshToken;
  if (!refreshToken) return res.json({ loggedIn: false });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(200).json({ loggedIn: false });
    const accessToken = generateAccessToken({ username: user.username });
    return res.status(200).json({ loggedIn: true, accessToken });
  });
};

export const getUser = async (req, res) => {
  const userId = await getID(req.user.username);
  return res.status(200).json({ username: req.user.username, id: userId });
};

export const changePassword = async (req, res) => {
  const { username } = req.user;
  const { currentPass, newPass } = req.body;
  try {
    const result = await updatePassword(username, currentPass, newPass);
    if (!result) {
      return res.status(403).json({
        title: "IncorrectPassword",
        message: "Current password is incorrect.",
      });
    }
    return res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server is unreachable at the moment.",
    });
  }
};

export const login = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const userId = await getID(username);
  const accessToken = generateAccessToken({
    username: username,
  });
  const refreshToken = generateRefreshToken({
    username: username,
  });
  const success = await insertToken(username, refreshToken);
  if (success) {
    return res.status(200).json({
      message: "User logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: userId,
    });
  } else {
    return res.status(500).json({
      error: "ServerError",
      message: "Something went wrong",
    });
  }
};

export const refreshToken = (req, res) => {
  const accessToken = generateAccessToken({
    username: req.user.username.toLowerCase(),
  });
  return res.status(200).json({
    accessToken: accessToken,
    username: req.user.username.toLowerCase(),
  });
};

export const logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  try {
    await deleteRefreshTokenFromDB(refreshToken);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};
