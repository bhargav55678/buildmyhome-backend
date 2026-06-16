const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createReview,
    getProviderReviews
} = require("../controllers/reviewController");

// Add Review
router.post("/", protect, createReview);

// Get Reviews By Provider
router.get("/:providerId", protect, getProviderReviews);

module.exports = router;