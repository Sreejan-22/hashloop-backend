const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "profiles",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
