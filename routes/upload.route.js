const { Router } = require("express");
const { uploadImageToCloudinary } = require("../controllers/upload.controller");
const upload = require("../config/multer");

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  checkAuthentication,
  uploadImageToCloudinary
);
