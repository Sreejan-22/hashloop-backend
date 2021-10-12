const { Router } = require("express");
const {
  editProfile,
  createProfile,
  getProfileOfUser,
} = require("../controllers/profile.controller");
const { checkAuthentication } = require("../middlewares/auth.middleware");

const router = Router();

// get profile of a user
router.get("/profile/:id", getProfileOfUser);

// create a profile for a new user
// initially after sign up, the username, email, name fields will get assigned their respective values
// later on the profile will be updated
router.post("/profile", checkAuthentication, createProfile);

// edit profile
router.put("/profile/:id", checkAuthentication, editProfile);
module.exports = router;
