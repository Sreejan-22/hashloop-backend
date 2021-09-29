const { Router } = require("express");
const { editProfile } = require("../controllers/profile.controller");

const router = Router();

router.post("/profile/:id", checkAuthentication, editProfile);
module.exports = router;
