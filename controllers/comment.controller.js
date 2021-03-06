const Comment = require("../models/comment.model");
const Profile = require("../models/profile.model");

const getAllCommentsOfProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const comments = await Comment.find({ projectId })
      .sort({ createdAt: -1 })
      .populate({ path: "authorId", model: Profile });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch comments",
      error: err,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { projectId, authorId, username, author, commentText } = req.body;
    const commentData = {
      projectId,
      authorId,
      username,
      author,
      commentText,
    };
    const newComment = await Comment.create(commentData);
    res.status(201).json({
      success: true,
      message: "New comment created",
      comment: newComment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create comment",
      error: err,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Comment deleted", deletedComment });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete comment",
      error: err,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, username, author, commentText } = req.body;
    const commentData = {
      projectId,
      authorId,
      username,
      author,
      commentText,
    };
    const oldComment = await Comment.findByIdAndUpdate(id, commentData);
    res.status(200).json({ success: true, message: "Comment updated" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to edit comment",
      error: err,
    });
  }
};

module.exports = {
  getAllCommentsOfProject,
  addComment,
  deleteComment,
  editComment,
};
