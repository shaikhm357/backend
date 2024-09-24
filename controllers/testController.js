// @desc    Get all Tests
// @route   GET /api/v1/test
// @access  Public

exports.getTests = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show All Test" })
}

// @desc    Get all Tests
// @route   GET /api/v1/test
// @access  Publice

exports.getTest = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show Test ${req.params.id}` })
}

// @desc    Create new Tests
// @route   POST /api/v1/test/:id
// @access  Public

exports.createTest = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Create New Test" })
}

// @desc    Update Test
// @route   PUT /api/v1/test/:id
// @access  Public

exports.updateTest = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update Test ${req.params.id}` })
}
// @desc    Get Test
// @route   DELETE /api/v1/test/:id
// @access  Publice

exports.deleteTest = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete Test ${req.params.id}` })

}