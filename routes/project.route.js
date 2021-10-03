const { Router } = require("express");
const { checkAuthentication } = require("../middlewares/auth.middleware");
const {
  getAllProjects,
  getAllProjectsOfUser,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = Router();

// create a new project
router.post("/projects", checkAuthentication, createProject);

// get all projects of a user
router.get("/projects/:username", getAllProjectsOfUser);

// get all projects
router.get("/projects", getAllProjects);

// edit/update a project
router.put("/projects/:id", checkAuthentication, updateProject);

// delete a project
router.delete("/projects/:id", checkAuthentication, deleteProject);

module.exports = router;
