const { Router } = require("express");
const { checkAuthentication } = require("../middlewares/auth.middleware");
const {
  saveOneProject,
  getSavedProjectsOfUser,
  unsaveProject,
} = require("../controllers/saved.controller");

const router = Router();

router.post("/saved/:username/:projectId", checkAuthentication, saveOneProject);
router.get("/saved/:username", checkAuthentication, getSavedProjectsOfUser);
router.delete(
  "/saved/:username/:projectId",
  checkAuthentication,
  unsaveProject
);

module.exports = router;
