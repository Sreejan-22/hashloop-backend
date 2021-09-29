const Comment = require("../models/comment.model");

const getAllCommentsOfProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const comments = await Comment.find({ projectId });
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
    const { projectId, username, author, shortbio, comment } = req.body;
    const commentData = {
      projectId,
      username,
      author,
      shortbio,
      comment,
    };
    const comment = await Comment.create(commentData);
    res
      .status(201)
      .json({ success: true, message: "New comment created", comment });
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
    const { projectId, username, author, shortbio, comment } = req.body;
    const commentData = {
      projectId,
      username,
      author,
      shortbio,
      comment,
    };
    const editedComment = await Comment.findByIdAndUpdate(id, commentData);
    res
      .status(200)
      .json({ success: true, message: "Comment upated", editedComment });
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
