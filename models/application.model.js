import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job is required']
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Applicant is required']
    },
    status:{
        type: String,
        enum: {
            values: ['pending', 'accepted', 'rejected'],
            message: 'Status must be one of: pending, accepted, rejected'
        },
        default: 'pending'
    }
},{timestamps: true});

// Compound index to prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Indexes for better query performance
applicationSchema.index({ applicant: 1 });
applicationSchema.index({ job: 1 });
applicationSchema.index({ status: 1 });

export const Application = mongoose.model("Application", applicationSchema);