import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        };

        // Validate salary
        if (isNaN(salary) || Number(salary) <= 0) {
            return res.status(400).json({
                message: "Invalid salary amount.",
                success: false
            });
        }

        // Validate experience level
        if (isNaN(experience) || Number(experience) < 0) {
            return res.status(400).json({
                message: "Invalid experience level.",
                success: false
            });
        }

        // Validate position count
        if (isNaN(position) || Number(position) <= 0) {
            return res.status(400).json({
                message: "Invalid position count.",
                success: false
            });
        }

        // Validate job type
        const validJobTypes = ['full-time', 'part-time', 'contract', 'internship', 'freelance'];
        if (!validJobTypes.includes(jobType.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid job type.",
                success: false
            });
        }

        const job = await Job.create({
            title: title.trim(),
            description: description.trim(),
            requirements: requirements.split(",").map(req => req.trim()).filter(req => req.length > 0),
            salary: Number(salary),
            location: location.trim(),
            jobType: jobType.toLowerCase(),
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        const job = await Job.findById(jobId).populate({
            path: "company"
        }).populate({
            path: "applications",
            populate: {
                path: "applicant",
                select: "fullname email profile"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };

        return res.status(200).json({ 
            job, 
            success: true 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        }).sort({ createdAt: -1 });
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
