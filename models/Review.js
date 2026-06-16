const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);