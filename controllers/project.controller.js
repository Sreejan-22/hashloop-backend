const Project = require("../models/project.model");

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects: allProjects });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Could not fetch projects",
      error: err,
    });
  }
};

const getAllProjectsOfUser = async (req, res) => {
  try {
    const { username } = req.params;
    let allProjects = await Project.find({ username }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects: allProjects });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Could not fetch projects",
      error: err,
    });
  }
};

const getOneProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project) {
      res.status(200).json({ success: true, project });
    } else {
      res.status(400).json({
        success: false,
        message: "Project not found",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not fetch project", error: err });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
      message: "New project submitted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create project",
      error: err,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (project) {
      Object.entries(req.body).forEach(([key, value]) => {
        if (value !== project[key]) {
          project[key] = value;
        }
      });
      await project.save();
      res.status(200).json({
        success: true,
        message: "Project updated",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "This project does not exist",
        error: err,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update project",
      error: err,
    });
  }
};

const upvoteCountChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { newCount } = req.body;

    const project = await Project.findById(id);
    project.upvotes = newCount;
    await project.save();
    res.status(200).json({
      success: true,
      message: "Upvote count updated",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update upvote count",
      error: err,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Project deleted",
      deletedProject: project,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete project",
      error: err,
    });
  }
};

module.exports = {
  getAllProjects,
  getAllProjectsOfUser,
  getOneProjectById,
  createProject,
  updateProject,
  upvoteCountChange,
  deleteProject,
};
