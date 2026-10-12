import express from "express";
import Job from "../models/Job.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();


// ==========================================
// GET ALL JOBS
// ==========================================

router.get("/", async (req, res) => {
    try {
        const {
            search,
            location,
            category,
            experience,
            minSalary,
            maxSalary
        } = req.query;

        const filter = {
            status: "approved"
        };

        // Search by job title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Search by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        // Search by category
        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        // Search by experience
        if (experience) {
            filter.experience = {
                $regex: experience,
                $options: "i"
            };
        }

        // Minimum salary
        if (minSalary) {
            filter.salaryMin = {
                $gte: Number(minSalary)
            };
        }

        // Maximum salary
        if (maxSalary) {
            filter.salaryMax = {
                $lte: Number(maxSalary)
            };
        }

        const jobs = await Job.find(filter)
            .populate("company", "name logo location")
            .populate("recruiter", "name email")
            .sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==========================================
// GET SINGLE JOB
// ==========================================

router.get("/:id", async (req, res) => {
    try {

        const job = await Job.findById(req.params.id)
            .populate("company")
            .populate("recruiter", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==========================================
// CREATE JOB
// ==========================================

router.post(
    "/",
    protect,
    authorize("recruiter"),
    async (req, res) => {

        try {

            const {
                title,
                description,
                company,
                location,
                category,
                experience,
                salaryMin,
                salaryMax,
                skills,
                jobType,
                deadline
            } = req.body;

            if (
                !title ||
                !description ||
                !company ||
                !location ||
                !category ||
                !experience ||
                salaryMin === undefined ||
                salaryMax === undefined
            ) {
                return res.status(400).json({
                    message: "Please fill all required fields"
                });
            }

            const job = await Job.create({
                title,
                description,
                company,
                recruiter: req.user._id,
                location,
                category,
                experience,
                salaryMin,
                salaryMax,
                skills: skills || [],
                jobType: jobType || "Full-time",
                deadline
            });

            const createdJob = await Job.findById(job._id)
                .populate("company")
                .populate("recruiter", "name email");

            res.status(201).json({
                message: "Job created successfully",
                job: createdJob
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// ==========================================
// UPDATE JOB
// ==========================================

router.put(
    "/:id",
    protect,
    authorize("recruiter"),
    async (req, res) => {

        try {

            const job = await Job.findById(req.params.id);

            if (!job) {
                return res.status(404).json({
                    message: "Job not found"
                });
            }

            // Only job owner can update
            if (job.recruiter.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can only update your own jobs"
                });
            }

            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate("company")
                .populate("recruiter", "name email");

            res.json({
                message: "Job updated successfully",
                job: updatedJob
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// ==========================================
// DELETE JOB
// ==========================================

router.delete(
    "/:id",
    protect,
    authorize("recruiter"),
    async (req, res) => {

        try {

            const job = await Job.findById(req.params.id);

            if (!job) {
                return res.status(404).json({
                    message: "Job not found"
                });
            }

            // Only job owner can delete
            if (job.recruiter.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can only delete your own jobs"
                });
            }

            await Job.findByIdAndDelete(req.params.id);

            res.json({
                message: "Job deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


export default router;