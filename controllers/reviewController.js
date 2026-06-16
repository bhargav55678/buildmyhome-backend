const Review = require("../models/Review");

// CREATE REVIEW
const createReview = async (req, res) => {
    try {

        const {
            providerId,
            rating,
            comment
        } = req.body;

        const review = new Review({
            provider: providerId,
            user: req.user.id,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({
            message: "Review Added Successfully",
            review
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// GET REVIEWS FOR A PROVIDER
const getProviderReviews = async (req, res) => {
    try {

        const reviews = await Review.find({
            provider: req.params.providerId
        });

        res.status(200).json(reviews);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createReview,
    getProviderReviews
};