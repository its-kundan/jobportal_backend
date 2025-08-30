import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        minlength: [3, 'Job title must be at least 3 characters long'],
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true,
        minlength: [10, 'Job description must be at least 10 characters long'],
        maxlength: [2000, 'Job description cannot exceed 2000 characters']
    },
    requirements: [{
        type: String,
        trim: true,
        required: true
    }],
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary cannot be negative']
    },
    experienceLevel:{
        type: Number,
        required: [true, 'Experience level is required'],
        min: [0, 'Experience level cannot be negative'],
        max: [50, 'Experience level cannot exceed 50 years']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
        enum: {
            values: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
            message: 'Job type must be one of: full-time, part-time, contract, internship, freelance'
        }
    },
    position: {
        type: Number,
        required: [true, 'Number of positions is required'],
        min: [1, 'At least 1 position must be available']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Company is required']
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps: true});

// Indexes for better query performance
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ company: 1 });
jobSchema.index({ created_by: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ location: 1 });

export const Job = mongoose.model("Job", jobSchema);