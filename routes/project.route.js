const { Router } = require("express");
const { checkAuthentication } = require("../middlewares/auth.middleware");
const {
  getAllProjects,
  getAllProjectsOfUser,
  getTrendingProjects,
  getProjectsFromTag,
  createProject,
  updateProject,
  upvoteCountChange,
  deleteProject,
} = require("../controllers/project.controller");

const router = Router();

// create a new project
router.post("/projects", checkAuthentication, createProject);

// get all projects of a user
router.get("/projects/:username", getAllProjectsOfUser);

// get all projects
router.get("/projects", getAllProjects);

// get trending projects
router.get("/trending", getTrendingProjects);

// get projects with a particular tag
router.get("/tags/:tag", getProjectsFromTag);

// edit/update a project
router.put("/projects/:id", checkAuthentication, updateProject);

// delete a project
router.delete("/projects/:id", checkAuthentication, deleteProject);

router.put("/upvotes/:id", checkAuthentication, upvoteCountChange);

module.exports = router;
