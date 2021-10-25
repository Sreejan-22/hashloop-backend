const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "profiles",
    },
    username: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
    },
    code: {
      type: String,
      required: true,
      unique: "A project with this link already exists",
      trim: true,
    },
    live: {
      type: String,
      unique: "A project with this link already exists",
      trim: true,
    },
    image: {
      type: String,
      unique: "A project with this image already exists",
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    upvoters: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
