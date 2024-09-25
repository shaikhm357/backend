const express = require('express')
const { getMosques, getMosque, createMosque, updateMosque,
    deleteMosque } = require('../controllers/mosqueController')

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

module.exports = router