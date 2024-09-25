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
