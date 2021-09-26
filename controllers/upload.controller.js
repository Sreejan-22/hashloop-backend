const multer = require("../config/multer");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (req, res) => {
  try {
    const { file } = req.body;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadImageToCloudinary };
