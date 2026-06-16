const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({

    materialName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Material",
    materialSchema
);