const multer = require('multer');
const path = require('path');
const asyncHandler = require("../middleware/async")
const Mosque = require("../models/Mosque")

// @desc    Get all Mosques
// @route   GET /api/v1/Mosque
// @access  Public
exports.getMosques = asyncHandler(async (req, res, next) => {
    const mosque = await Mosque.find()
    res.status(200).json({
        success: true,
        count: mosque.length,
        data: mosque
    })
})

// @desc    Get a single Mosque
// @route   GET /api/v1/Mosque/:id
// @access  Public
exports.getMosque = asyncHandler(async (req, res, next) => {
    const mosque = await Mosque.findById(req.params.id)

    if (!mosque) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: mosque
    })
})

// @desc    Create new Mosque
// @route   POST /api/v1/Mosque
// @access  Public
exports.createMosque = asyncHandler(async (req, res, next) => {
    const mosque = await Mosque.create(req.body)
    res.status(201).json({ success: true, data: mosque })
})

// @desc    Update Mosque
// @route   PUT /api/v1/Mosque/:id
// @access  Public
exports.updateMosque = asyncHandler(async (req, res, next) => {
    const mosque = await Mosque.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!mosque) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: mosque })
})

// @desc    Delete Mosque
// @route   DELETE /api/v1/Mosque/:id
// @access  Public
exports.deleteMosque = asyncHandler(async (req, res, next) => {
    const mosque = await Mosque.findByIdAndDelete(req.params.id)

    if (!mosque) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: mosque })
})


// Set up the storage location and file names for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');  // Specify the folder to save images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Use the original file extension
    }
});

// Set up multer with the storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/; // Allow only image formats (jpg, jpeg, png)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});


// @desc    Upload an image
// @route   POST /api/v1/upload
// @access  Public
exports.uploadImage = (req, res) => {
    // Multer will handle the file upload, no need for asyncHandler
    upload.single('image')(req, res, function (err) {
        // Handle any errors from multer
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }

        // Check if a file has been uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // File upload successful, send the response with the file URL
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.status(200).json({
            success: true,
            data: {
                fileUrl: fileUrl,  // Full URL to access the image
            },
        });
    });
};
