const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    // const { name, username } = req.user;
    const { name, username, projectName, details, tags, code, live, image } =
      req.body;
    let projectData = {
      username,
      author: name,
      projectName,
      details,
      tags,
      code,
      live,
      image,
    };

    const project = await Project.create(projectData);
    res
      .status(201)
      .json({ status: "ok", data: project, message: "New project submitted" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err });
  }
};
// const updateProject = () => {};
// const deleteProject = () => {};

module.exports = {
  // getAllProjects,
  // getOneProjectById,
  createProject,
  // updateProject,
  // deleteProject,
};
