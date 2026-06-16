const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createMaterial,
    getMaterials,
    updateMaterial,
    deleteMaterial
} = require("../controllers/materialController");

router.post("/", protect, createMaterial);

router.get("/", protect, getMaterials);

router.put("/:id", protect, updateMaterial);

router.delete("/:id", protect, deleteMaterial);

module.exports = router;