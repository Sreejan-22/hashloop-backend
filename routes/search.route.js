const { Router } = require("express");
const { searchProfiles } = require("../controllers/search.controller");

const router = Router();

router.get("/search", searchProfiles);

module.exports = router;
