const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      ref: "User",
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
      required: true,
      unique: "A project with this link already exists",
      trim: true,
    },
    image: {
      type: String,
      unique: "A project with this image already exists",
      trim: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
