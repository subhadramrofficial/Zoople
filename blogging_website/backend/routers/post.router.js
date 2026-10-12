import express from "express";

import {
    createPost,
    getAllPosts,
    getSinglePost,
    getMyPosts,
    updatePost,
    deletePost,
    toggleLike,
    getLikedPosts,
    searchPosts,
    getPostsByCategory
} from "../controllers/post.controller.js";
import upload from "../utils/upload.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);

router.get("/", protect, getAllPosts);

router.get("/search", searchPosts);

router.get("/category/:category", getPostsByCategory);

router.get("/my-posts", protect, getMyPosts);

router.get("/liked-posts", protect, getLikedPosts);

router.get("/:id", getSinglePost);

router.put("/:id", protect, upload.single("image"), updatePost);

router.delete("/:id", protect, deletePost);

router.post("/:id/like", protect, toggleLike);

export default router;