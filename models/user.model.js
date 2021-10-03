const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { validatePassword } = require("../utils/validatePassword");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid name"],
    trim: true,
    minLength: [2, "Name should be atleast 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: "This username is already taken",
    trim: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    minLength: [2, "Username should be atleast 2 character long"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    trim: true,
    validate: [
      validatePassword,
      "Password must be at least 8 characters long(at least one lowercase letter, one uppercase letter, one digit and one special character)",
    ],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
