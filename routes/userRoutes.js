const express = require("express");

const router = express.Router();


const {
    registerUser,
    loginUser,
    updateProfile
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        message: "User Route Working"
    });
});

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Profile
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Welcome Protected User",
        user: req.user
    });
});

// Update Profile
router.put("/profile", protect, updateProfile);

module.exports = router;