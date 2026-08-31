import jwt from "jsonwebtoken";
import signupSchema from "../middlewares/validator.js";
import { doHash, doHashValidation } from "../utils/hashing.js";
import userModel from "../models/users.model.js";

export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = signupSchema.validate({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists!",
            });
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = new userModel({
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();

        result.password = undefined;

        return res.status(201).json({
            success: true,
            message: "Your account has been created successfully",
            result,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = signupSchema.validate({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const existingUser = await userModel
            .findOne({ email })
            .select("+password");

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist!",
            });
        }

        const result = await doHashValidation(
            password,
            existingUser.password
        );

        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            },
            process.env.TOKEN_SECRET
        );

        res.cookie("Authorization", "Bearer " + token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: process.env.NODE_ENV === "production",
        }).json({
            success: true,
            token,
            message: "Logged in successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};