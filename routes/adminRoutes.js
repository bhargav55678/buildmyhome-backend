const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getAllProjects,
    getAllProviders,
    getAllMaterials,
    getAllReviews
} = require("../controllers/adminController");

console.log("protect =", typeof protect);
console.log("admin =", typeof admin);
console.log("getAllUsers =", typeof getAllUsers);

router.get("/users", protect, admin, getAllUsers);
router.get("/projects", protect, admin, getAllProjects);
router.get("/providers", protect, admin, getAllProviders);
router.get("/materials", protect, admin, getAllMaterials);
router.get("/reviews", protect, admin, getAllReviews);


module.exports = router;