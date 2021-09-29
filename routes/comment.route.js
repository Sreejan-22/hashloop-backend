const { Router } = require("express");
const {
  addComment,
  deleteComment,
  editComment,
  getAllCommentsOfProject,
} = require("../controllers/comment.controller");

const router = Router();

router.get("/comments/:projectId", getAllCommentsOfProject);
router.post("/comments", addComment);
router.delete("/comments/:id", deleteComment);
router.put("/comments/:id", editComment);

module.exports = router;
