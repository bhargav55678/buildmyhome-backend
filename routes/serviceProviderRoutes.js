const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProvider,
    getProviders,
    updateProvider,
    deleteProvider,
    getProviderWithRating,
    searchProviders,
    searchProvidersByLocation
} = require("../controllers/serviceProviderController");

router.post("/", protect, createProvider);

router.get("/", protect, getProviders);

router.put("/:id", protect, updateProvider);

router.delete("/:id", protect, deleteProvider);

router.get("/search/:profession", protect, searchProviders);

router.get("/:id/rating", protect, getProviderWithRating);

router.get("/location/:location", protect, searchProvidersByLocation);

module.exports = router;