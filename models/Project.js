const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    projectName: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    progress: {
        type: Number,
        default: 0
    },

    stage: {
        type: String,
        default: "Planning"
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);