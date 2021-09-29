const Profile = require("../models/profile.model");

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(id, profileData);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to update profile",
        error: err,
      });
  }
};

module.exports = {
  editProfile,
};
