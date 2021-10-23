const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedProjectSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
    username: {
      type: String,
      required: true,
    },
  },
  { createdAt: true }
);

const Saved = mongoose.model("savedProject", savedProjectSchema);
module.exports = Saved;
