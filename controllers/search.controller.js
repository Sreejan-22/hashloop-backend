const Profile = require("../models/profile.model");

const searchProfiles = async (req, res) => {
  try {
    const { name } = req.query;

    const profilesFound = await Profile.find({
      name: { $regex: name, $options: "i" },
    });
    if (profilesFound?.length) {
      res.status(200).json({ success: true, profilesFound });
    } else {
      res.status(200).json({ success: true, profilesFound: [] });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

module.exports = {
  searchProfiles,
};
