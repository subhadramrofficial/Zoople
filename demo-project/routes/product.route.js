import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
const router = express.Router();
// GET all products
router.get("/", getProducts);
// GET one product
router.get("/:id", getProduct);
// CREATE product
router.post("/", createProduct);
// UPDATE product
router.put("/:id", updateProduct);
// DELETE product
router.delete("/:id", deleteProduct);
export default router;