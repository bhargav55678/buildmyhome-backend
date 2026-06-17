const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

      const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({
        message: "Access Denied. No Token Provided"
    });
}

const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided"
            });
        }

        const decoded = jwt.verify(
  token,
  "myverystrongsecretkey123"
);

        console.log("DECODED:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        console.log("AUTH USER:", user.email);
        console.log("AUTH ROLE:", user.role);

        req.user = user;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error);

        return res.status(401).json({
            message: error.message
        });
    }
};

module.exports = protect;