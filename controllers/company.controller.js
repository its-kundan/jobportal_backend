import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName || companyName.trim().length === 0) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName.trim() });
        if (company) {
            return res.status(400).json({
                message: "Company with this name already exists.",
                success: false
            })
        };

        company = await Company.create({
            name: companyName.trim(),
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
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

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        
        return res.status(200).json({
            companies,
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

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        if (!companyId) {
            return res.status(400).json({
                message: "Company ID is required",
                success: false
            });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
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

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = req.params.id;

        if (!companyId) {
            return res.status(400).json({
                message: "Company ID is required",
                success: false
            });
        }

        // Check if company exists and belongs to the user
        const existingCompany = await Company.findOne({ _id: companyId, userId: req.id });
        if (!existingCompany) {
            return res.status(404).json({
                message: "Company not found or you don't have permission to update it.",
                success: false
            });
        }

        const updateData = { name, description, website, location };

        // Handle logo upload if file is present
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.log(uploadError);
                return res.status(500).json({
                    message: "Error uploading logo",
                    success: false
                });
            }
        }

        // Validate company name if provided
        if (name && name.trim().length === 0) {
            return res.status(400).json({
                message: "Company name cannot be empty",
                success: false
            });
        }

        // Check if new name conflicts with existing company
        if (name && name !== existingCompany.name) {
            const nameConflict = await Company.findOne({ 
                name: name.trim(), 
                _id: { $ne: companyId } 
            });
            if (nameConflict) {
                return res.status(400).json({
                    message: "Company name already exists",
                    success: false
                });
            }
        }

        const company = await Company.findByIdAndUpdate(
            companyId, 
            updateData, 
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
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