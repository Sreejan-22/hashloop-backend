require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");
const { handleError } = require("../utils/handleSignupErrors");

module.exports.signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = await User.create({ name, email, username, password });

    const saltRounds = 10;
    // auto generate a salt and hash
    user.password = await bcrypt.hash(user.password, saltRounds);
    const newUser = await user.save();

    // after a new account is created, the user is logged into the website
    // so a token, to be sent to the frontend, has to be generated
    const token = createToken(newUser._id);
    res.status(201).json({ status: "ok", user: user.username, token });
  } catch (err) {
    const errors = handleError(err);

    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.username === "" &&
      errors.password === ""
    ) {
      res.status(500).json({
        status: "serverError",
        message: "Oops!! Something went wrong!",
      });
    } else {
      res.status(400).json({ status: "error", errors });
    }
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.status(200).json({ status: "ok", user: user.username, token });
      } else {
        res
          .status(403)
          .json({ status: "error", message: "Incorrect Password" });
      }
    } else {
      res
        .status(400)
        .json({ status: "error", message: "This email is not registered" });
    }
  } catch (err) {
    res.status(500).json({
      status: "serverError",
      message: "Oops!! Something went wrong!",
    });
  }
};
