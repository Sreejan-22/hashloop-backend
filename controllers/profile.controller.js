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
    const { username } = req.params;
    const profile = await Profile.findOne({ username });

    if (profile) {
      Object.entries(req.body).forEach(([key, value]) => {
        if (value !== profile[key]) {
          profile[key] = value;
        }
      });

      await profile.save();

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedProfile: profile,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Profile not found",
        error: err,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update profile",
      error: err,
    });
  }
};

const editFollowCount = async (req, res) => {
  try {
    const { follow, follower, person } = req.body;
    // follow => true/false -> follow/unfollow
    const followerProfile = await Profile.findOne({ username: follower });
    const personProfile = await Profile.findOne({ username: person });
    if (followerProfile && personProfile) {
      if (follow) {
        // update follower count of "person"
        personProfile.followers.push(follower);

        // update following count of "follower"
        followerProfile.following.push(person);
      } else {
        const index = personProfile.followers.indexOf(follower);
        personProfile.followers.splice(index, 1);

        const index2 = followerProfile.following.indexOf(person);
        followerProfile.following.splice(index2, 1);
      }

      await personProfile.save();
      await followerProfile.save();

      res.status(200).json({
        success: true,
        message: "Follow count updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "An error occured",
        error: err,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "An error occured",
      error: err,
    });
  }
};

module.exports = {
  getProfileOfUser,
  createProfile,
  editProfile,
  editFollowCount,
};
