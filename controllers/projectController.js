const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
    try {

        const {
            projectName,
            location,
            budget,
            description
        } = req.body;

      const project = new Project({
    projectName,
    location,
    budget,
    description,

    owner: req.user.id,

    progress: 0,
    stage: "Planning"
});

        await project.save();

        res.status(201).json({
            message: "Project Created Successfully",
            project
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// GET MY PROJECTS
const getMyProjects = async (req, res) => {
    try {

        const projects = await Project.find({
    owner: req.user.id
});

        res.status(200).json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            });
        }

        if (project.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        project.projectName =
            req.body.projectName || project.projectName;

        project.location =
            req.body.location || project.location;

        project.budget =
            req.body.budget || project.budget;

        project.description =
            req.body.description || project.description;

        const updatedProject = await project.save();

        res.status(200).json({
            message: "Project Updated Successfully",
            project: updatedProject
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            });
        }

        if (project.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await project.deleteOne();

        res.status(200).json({
            message: "Project Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProjectProgress = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            });
        }

        if (project.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        project.progress =
            req.body.progress ?? project.progress;

        project.stage =
            req.body.stage || project.stage;

        const updatedProject = await project.save();

        res.status(200).json({
            message: "Project Progress Updated",
            project: updatedProject
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createProject,
    getMyProjects,
    updateProject,
    deleteProject,
    updateProjectProgress
};