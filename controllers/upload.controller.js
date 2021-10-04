// const multer = require("../config/multer");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (req, res) => {
  try {
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(201).json({
      success: true,
      message: "file uploaded to cloudinary successfully",
      imageUrl: result.secure_url,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "File couldn't be uploaded",
      error: err.message,
    });
  }
};

module.exports = { uploadImageToCloudinary };
