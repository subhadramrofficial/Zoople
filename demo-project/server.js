import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((error) => {
        console.log("Connection failed!");
        console.log(error.message);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});