import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        location: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        experience: {
            type: String,
            required: true
        },

        salaryMin: {
            type: Number,
            required: true
        },

        salaryMax: {
            type: Number,
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        jobType: {
            type: String,
            enum: [
                "Full-time",
                "Part-time",
                "Contract",
                "Internship"
            ],
            default: "Full-time"
        },

        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "closed"
            ],
            default: "approved"
        },

        deadline: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "Job",
    jobSchema
);