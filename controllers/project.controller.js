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
    let allProjects = await Project.find({ username });
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
    const { username, author, projectName, details, tags, code, live, image } =
      req.body;
    let projectData = {
      username,
      author,
      projectName,
      details,
      tags,
      code,
      live,
      image,
    };

    const project = await Project.create(projectData);
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
    const { username, author, projectName, details, tags, code, live, image } =
      req.body;
    const updateQuery = {
      username,
      author,
      projectName,
      details,
      tags,
      code,
      live,
      image,
    };
    const project = await Project.findByIdAndUpdate(id, updateQuery);
    res.status(200).json({
      success: true,
      message: "Project updated",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update project",
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
  deleteProject,
};
