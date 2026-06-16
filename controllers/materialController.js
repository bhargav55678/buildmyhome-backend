const Material = require("../models/Material");

const createMaterial = async (req, res) => {
    try {

        const {
            materialName,
            quantity,
            unit,
            price
        } = req.body;

        const material = new Material({
            materialName,
            quantity,
            unit,
            price,
            owner: req.user.id
        });

        await material.save();

        res.status(201).json({
            message: "Material Added Successfully",
            material
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getMaterials = async (req, res) => {
    try {

        const materials = await Material.find({
            owner: req.user.id
        });

        res.status(200).json(materials);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateMaterial = async (req, res) => {
    try {

        const material = await Material.findById(req.params.id);

        if (!material) {
            return res.status(404).json({
                message: "Material Not Found"
            });
        }

        if (material.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        material.materialName =
            req.body.materialName || material.materialName;

        material.quantity =
            req.body.quantity || material.quantity;

        material.unit =
            req.body.unit || material.unit;

        material.price =
            req.body.price || material.price;

        const updatedMaterial = await material.save();

        res.status(200).json({
            message: "Material Updated Successfully",
            material: updatedMaterial
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteMaterial = async (req, res) => {
    try {

        const material = await Material.findById(req.params.id);

        if (!material) {
            return res.status(404).json({
                message: "Material Not Found"
            });
        }

        if (material.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await material.deleteOne();

        res.status(200).json({
            message: "Material Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createMaterial,
    getMaterials,
    updateMaterial,
    deleteMaterial
};