const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
    try {

       const { name, email, phone, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
    role
});
        await user.save();

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }
const token = jwt.sign(
  { id: user._id },
  "myverystrongsecretkey123",
  { expiresIn: "1d" }
);

        res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
    updateProfile
};

