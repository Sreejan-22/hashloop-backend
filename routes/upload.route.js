const { Router } = require("express");
const { uploadImageToCloudinary } = require("../controllers/upload.controller");

const router = Router();

router.post("/upload", uploadImageToCloudinary);
