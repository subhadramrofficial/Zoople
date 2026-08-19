import express from "express";
import { loginController } from "../controllers/auth.controller.js";
export const router = express.Router();
router.post("/login", loginController);
