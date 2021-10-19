const { Router } = require("express");
const {
  editProfile,
  createProfile,
  getProfileOfUser,
  editFollowCount,
} = require("../controllers/profile.controller");
const { checkAuthentication } = require("../middlewares/auth.middleware");

const router = Router();

// get profile of a user
router.get("/profile/:username", getProfileOfUser);

// create a profile for a new user
// initially after sign up, the username, email, name fields will get assigned their respective values
// later on the profile will be updated
router.post("/profile", checkAuthentication, createProfile);

// edit profile
router.put("/profile/:username", checkAuthentication, editProfile);

// edit follow count
router.put("/follow", checkAuthentication, editFollowCount);

module.exports = router;
