require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");
const uploadRoutes = require("./routes/upload.route");
const projectRoutes = require("./routes/project.route");
const commentRoutes = require("./routes/comment.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const port = process.env.PORT;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
app.use(profileRoute);
app.use(uploadRoutes);
app.use(projectRoutes);
app.use(commentRoutes);

// 404
app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "404 page!! Not found!!" });
});
