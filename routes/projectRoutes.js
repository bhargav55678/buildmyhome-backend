const express = require("express");

const router = express.Router();


const {
    createProject,
    getMyProjects,
    updateProject,
    deleteProject,
    updateProjectProgress
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// Create Project
router.post("/", protect, createProject);

// Get My Projects
router.get("/", protect, getMyProjects);

// Update Project
router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

router.put("/:id/progress", protect, updateProjectProgress);


module.exports = router;