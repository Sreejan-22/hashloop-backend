const { Router } = require("express");
const { uploadImageToCloudinary } = require("../controllers/upload.controller");
const upload = require("../config/multer");
const { checkAuthentication } = require("../middlewares/auth.middleware");

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  checkAuthentication,
  uploadImageToCloudinary
);

module.exports = router;
