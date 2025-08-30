import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters long'],
        maxlength: [50, 'Full name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        min: [1000000000, 'Phone number must be at least 10 digits'],
        max: [999999999999, 'Phone number cannot exceed 12 digits']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role:{
        type: String,
        enum: {
            values: ['student', 'recruiter'],
            message: 'Role must be either student or recruiter'
        },
        required: [true, 'Role is required']
    },
    profile:{
        bio:{
            type: String,
            maxlength: [500, 'Bio cannot exceed 500 characters']
        },
        skills:[{
            type: String,
            trim: true
        }],
        resume:{
            type: String
        },
        resumeOriginalName:{
            type: String
        },
        company:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Company'
        }, 
        profilePhoto:{
            type: String,
            default: ""
        }
    },
},{timestamps: true});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export const User = mongoose.model('User', userSchema);