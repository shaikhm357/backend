const express = require('express')
const { getMosques, getMosque, createMosque, updateMosque,
    deleteMosque, uploadImage } = require('../controllers/mosqueController.js')

const router = express.Router()

router
    .route('/')
    .get(getMosques)
    .post(createMosque)

router
    .route('/:id')
    .get(getMosque)
    .put(updateMosque)
    .delete(deleteMosque)

// Route for uploading images
router
    .route('/upload')
    .post(uploadImage);

module.exports = router