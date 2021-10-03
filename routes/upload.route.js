const { Router } = require("express");
const { uploadImageToCloudinary } = require("../controllers/upload.controller");
const upload = require("../config/multer");
const { checkAuthentication } = require("../middlewares/auth.middleware");

const router = Router();

router.post(
  "/upload",
  checkAuthentication,
  upload.single("image"),
  uploadImageToCloudinary
);

module.exports = router;
