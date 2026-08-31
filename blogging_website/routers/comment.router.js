import express from "express";

import {
    addComment,
    getComments,
    deleteComment
} from "../controllers/comment.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/post/:postId",
    protect,
    addComment
);

router.get(
    "/post/:postId",
    getComments
);

router.delete(
    "/:commentId",
    protect,
    deleteComment
);

export default router;