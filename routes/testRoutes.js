const express = require('express')
const { getTests, getTest, createTest, updateTest,
    deleteTest } = require('../controllers/testController.js')

const router = express.Router()

router
    .route('/')
    .get(getTests)
    .post(createTest)

router
    .route('/:id')
    .get(getTest)
    .put(updateTest)
    .delete(deleteTest)

module.exports = router