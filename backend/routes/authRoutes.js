import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => {

    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


// REGISTER

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (
            !name ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "All fields are required"
            });
        }

        const existingUser =
            await User.findOne({
                email
            });

        if (existingUser) {

            return res.status(400).json({
                message:
                    "Email already registered"
            });
        }

        const user =
            await User.create({
                name,
                email,
                password,
                role:
                    role || "jobseeker"
            });

        res.status(201).json({

            message:
                "Registration successful",

            token:
                generateToken(user._id),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const isMatch =
            await user.comparePassword(
                password
            );

        if (!isMatch) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        res.json({

            message: "Login successful",

            token:
                generateToken(user._id),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

export default router;