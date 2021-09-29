const { Router } = require("express");
const { editProfile } = require("../controllers/profile.controller");

const router = Router();

router.post("/profile/:id", editProfile);
module.exports = router;
