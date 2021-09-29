const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      trim: true,
    },
    shortbio: {
      type: String,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    followers: {
      type: Number,
    },
    following: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
