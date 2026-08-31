import express from "express";

import {
    getUserProfile,
    updateProfile,
    getUserPosts
} from "../controllers/user.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", getUserProfile);

router.put("/profile", protect, updateProfile);

router.get("/:id/posts", getUserPosts);

export default router;