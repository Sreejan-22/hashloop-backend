const Profile = require("../models/profile.model");

const getProfileOfUser = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch profile details",
      error: err,
    });
  }
};

const createProfile = async (req, res) => {
  try {
    // const { profileId, email, username, pic, cover, bio, city, country, skills, github, twitter, linkedin, portfolio, followers, following } = req.body;
    const profileData = req.body;
    const newProfile = await Profile.create(profileData);
    res.status(201).json({ success: true, profile: newProfile });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create profile",
      error: err,
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (profile) {
      Object.entries(req.body).forEach(([key, value]) => {
        if (value !== project[key]) {
          profile[key] = value;
        }
      });
      await profile.save();
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedProfile,
      });
    }
    res.status(400).json({
      success: false,
      message: "Profile not found",
      error: err,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update profile",
      error: err,
    });
  }
};

module.exports = {
  getProfileOfUser,
  createProfile,
  editProfile,
};
