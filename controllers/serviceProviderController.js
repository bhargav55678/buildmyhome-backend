const ServiceProvider = require("../models/ServiceProvider");

// CREATE PROVIDER
const createProvider = async (req, res) => {
    try {

        const {
            name,
            profession,
            experience,
            phone,
            location
        } = req.body;

        const provider = new ServiceProvider({
            name,
            profession,
            experience,
            phone,
            location,
            owner: req.user.id
        });

        await provider.save();

        res.status(201).json({
            message: "Provider Added Successfully",
            provider
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// GET PROVIDERS
const getProviders = async (req, res) => {
    try {

        const providers = await ServiceProvider.find({
            owner: req.user.id
        });

        res.status(200).json(providers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProvider = async (req, res) => {
    try {

        const provider = await ServiceProvider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({
                message: "Provider Not Found"
            });
        }

        if (provider.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        provider.name =
            req.body.name || provider.name;

        provider.profession =
            req.body.profession || provider.profession;

        provider.experience =
            req.body.experience || provider.experience;

        provider.phone =
            req.body.phone || provider.phone;

        provider.location =
            req.body.location || provider.location;

        const updatedProvider = await provider.save();

        res.status(200).json({
            message: "Provider Updated Successfully",
            provider: updatedProvider
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteProvider = async (req, res) => {
    try {

        const provider = await ServiceProvider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({
                message: "Provider Not Found"
            });
        }

        if (provider.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await provider.deleteOne();

        res.status(200).json({
            message: "Provider Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getProviderWithRating = async (req, res) => {
    try {

        const Review = require("../models/Review");

        const provider = await ServiceProvider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({
                message: "Provider Not Found"
            });
        }

        const reviews = await Review.find({
            provider: provider._id
        });

        let averageRating = 0;

        if (reviews.length > 0) {

            const totalRating = reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            );

            averageRating =
                totalRating / reviews.length;
        }

        res.status(200).json({
            provider,
            averageRating,
            totalReviews: reviews.length
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const searchProviders = async (req, res) => {
    try {

        const profession = req.params.profession;

        const providers = await ServiceProvider.find({
            profession: {
                $regex: profession,
                $options: "i"
            }
        });

        res.status(200).json(providers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const searchProvidersByLocation = async (req, res) => {
    try {

        const location = req.params.location;

        const providers = await ServiceProvider.find({
            location: {
                $regex: location,
                $options: "i"
            }
        });

        res.status(200).json(providers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createProvider,
    getProviders,
    updateProvider,
    deleteProvider,
    getProviderWithRating,
    searchProviders,
    searchProvidersByLocation
};