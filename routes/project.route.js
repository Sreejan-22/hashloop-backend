const { Router } = require("express");
const { createProject } = require("../controllers/project.controller");

const router = Router();

// get all projects
// router.get("/projects", (req, res) => {});

// create a new project
router.post("/projects", createProject);

// edit/update a project
// router.put("/projects/:id", (req, res) => {});

// delete a project
// router.delete("/projects/:id", (req, res) => {});

module.exports = router;
