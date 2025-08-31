import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Company name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Company name must be at least 2 characters long'],
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    description:{
        type: String,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
        trim: true
    },
    website:{
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
    },
    location:{
        type: String,
        trim: true
    },
    logo:{
        type: String // URL to company logo
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    }
},{timestamps: true});

// Indexes for better query performance
companySchema.index({ name: 1 });
companySchema.index({ userId: 1 });

export const Company = mongoose.model("Company", companySchema);