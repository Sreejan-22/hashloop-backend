const Saved = require("../models/saved.model");
const Project = require("../models/project.model");

const saveOneProject = async (req, res) => {
  try {
    const { projectId, username } = req.params;

    const newSavedProject = await Saved.create({
      projectId,
      username,
    });

    res
      .status(201)
      .json({ success: true, message: "Project saved", newSavedProject });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to bookmark project" });
  }
};

const getSavedProjectsOfUser = async (req, res) => {
  try {
    const { username } = req.params;
    const savedProjects = await Saved.find({ username })
      .sort({ createdAt: -1 })
      .populate({ path: "projectId", model: Project });
    if (savedProjects) {
      res.status(200).json({ success: true, savedProjects });
    } else {
      res.status(200).json({ success: true, savedProjects: [] });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to bookmark project",
      error: err,
    });
  }
};

const unsaveProject = async (req, res) => {
  try {
    const { username, projectId } = req.params;
    const removedProject = await Saved.findOneAndDelete({
      username,
      projectId,
    });
    res
      .status(200)
      .json({ success: true, message: "Project removed from bookmarks" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to remove project from bookmarks",
      error: err,
    });
  }
};

module.exports = {
  saveOneProject,
  getSavedProjectsOfUser,
  unsaveProject,
};
