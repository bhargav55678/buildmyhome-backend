const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imageController");

router.post("/", protect, uploadImage);

router.get("/", protect, getImages);

router.delete("/:id", protect, deleteImage);

module.exports = router;