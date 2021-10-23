const { Router } = require("express");
const { checkAuthentication } = require("../middlewares/auth.middleware");
const {
  saveOneProject,
  getSavedProjectsOfUser,
} = require("../controllers/saved.controller");

const router = Router();

router.post("/saved/:projectId", checkAuthentication, saveOneProject);
router.get("/saved/:username", checkAuthentication, getSavedProjectsOfUser);

module.exports = router;
