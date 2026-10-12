import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Job Portal Backend is running"
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running at http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("MongoDB Error:", error.message);
    });