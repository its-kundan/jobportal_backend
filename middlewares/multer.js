import multer from "multer";

const storage = multer.memoryStorage();

// File filter to validate file types
const fileFilter = (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
    }
};

// Configure multer with file size limit and file filter
export const singleUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single("file");

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File too large. Maximum size is 5MB.',
                success: false
            });
        }
        return res.status(400).json({
            message: 'File upload error',
            success: false
        });
    }
    
    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }
    
    next(error);
};
