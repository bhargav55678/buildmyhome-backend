const admin = (req, res, next) => {

    console.log("Logged User:", req.user.email);
    console.log("Logged User Role:", req.user.role);

    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Admin Access Only"
        });
    }

    next();
};

module.exports = admin;