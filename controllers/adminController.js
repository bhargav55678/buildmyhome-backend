const User = require("../models/User");

const Review = require("../models/Review");

const getAllUsers = async (req, res) => {

    console.log("ADMIN CONTROLLER HIT");

    try {

        const users = await User.find().select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const Project = require("../models/Project");

const getAllProjects = async (req, res) => {
    try {

        const projects = await Project.find();

        res.status(200).json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const ServiceProvider = require("../models/ServiceProvider");

const getAllProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find();

        res.status(200).json(providers);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const Material = require("../models/Material");

const getAllMaterials = async (req, res) => {
    try {

        const materials = await Material.find();

        res.status(200).json(materials);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getAllReviews = async (req, res) => {
    try {

        const reviews = await Review.find();

        res.status(200).json(reviews);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getAllProjects,
    getAllProviders,
    getAllMaterials,
    getAllReviews
};