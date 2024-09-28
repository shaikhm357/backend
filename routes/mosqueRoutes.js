const express = require("express");
const {
  getMosques,
  getMosque,
  createMosque,
  updateMosque,
  deleteMosque,
  uploadImage,
} = require("../controllers/mosqueController.js");

const { admin, protect } = require("../middleware/auth.js");

const router = express.Router();

router.route("/").get(protect, getMosques).post(protect, admin, createMosque);

router
  .route("/:id")
  .get(protect, getMosque)
  .put(protect, admin, updateMosque)
  .delete(protect, admin, deleteMosque);

// Route for uploading images
router.route("/upload").post(uploadImage);

module.exports = router;
