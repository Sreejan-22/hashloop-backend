const { Router } = require("express");
const {
  addComment,
  deleteComment,
  editComment,
  getAllCommentsOfProject,
} = require("../controllers/comment.controller");

const router = Router();

router.get("/comments/:projectId", getAllCommentsOfProject);
router.post("/comments", checkAuthentication, addComment);
router.delete("/comments/:id", checkAuthentication, deleteComment);
router.put("/comments/:id", checkAuthentication, editComment);

module.exports = router;
