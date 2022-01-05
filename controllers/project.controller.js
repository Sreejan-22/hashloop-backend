const Project = require("../models/project.model");
const Profile = require("../models/profile.model");

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find()
      .sort({ createdAt: -1 })
      .populate({ path: "authorId", model: Profile });
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
    let allProjects = await Project.find({ username })
      .sort({ createdAt: -1 })
      .populate({ path: "authorId", model: Profile });
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
    const project = await Project.findById(id).populate({
      path: "authorId",
      model: Profile,
    });
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

const getTrendingProjects = async (req, res) => {
  try {
    // most upvoted projects with the most recent ones shown first
    const temp = await Project.find()
      .sort({
        upvotes: "desc",
        createdAt: -1,
      })
      .populate({ path: "authorId", model: Profile });

    let trendingProjects = [];
    if (temp && temp.length >= 3) {
      trendingProjects = [...temp];
      trendingProjects = trendingProjects.slice(0, 3);
    } else if (temp) {
      trendingProjects = temp;
    }

    res.status(200).json({ success: true, trendingProjects });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Could not fetch trending projects",
      error: err,
    });
  }
};

const getProjectsFromTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const projects = await Project.find({ tags: tag }).populate({
      path: "authorId",
      model: Profile,
    });
    if (projects) {
      res.status(200).json({ success: true, projects });
    } else {
      res.status(200).json({ success: true, projects: [] });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch projects with this tag",
      error: err,
    });
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
    const { newCount, newUpvotersList } = req.body;

    const project = await Project.findById(id);
    if (project) {
      project.upvotes = newCount;
      project.upvoters = newUpvotersList;
      await project.save();
      res.status(200).json({
        success: true,
        updatedProject: project,
        message: "Upvote count updated",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Project not found",
        error: err,
      });
    }
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
  getTrendingProjects,
  getProjectsFromTag,
  createProject,
  updateProject,
  upvoteCountChange,
  deleteProject,
};
