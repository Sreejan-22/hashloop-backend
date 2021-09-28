const { Router } = require("express");
const {
  getAllProjects,
  getAllProjectsOfUser,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = Router();

// get all projects
router.get("/projects", getAllProjects);

// get all projects of a user
router.get("/projects/:username", getAllProjectsOfUser);

// create a new project
router.post("/projects", createProject);

// edit/update a project
router.put("/projects/:id", updateProject);

// delete a project
router.delete("/projects/:id", deleteProject);

module.exports = router;
