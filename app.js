const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const { MONGODB_CONNECTION_STRING } = require("./util/config");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();
const port = 8080;

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  switch (file.mimetype) {
    case "image/png":
    case "image/jpg":
    case "image/jpeg":
      cb(null, true);
    default:
      cb(null, false);
  }
};

app.use(cors());
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  let { message, statusCode } = error;
  statusCode = statusCode || 500;
  res.status(statusCode).json({ message: message });
});

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then((dbConnection) => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// Protect actions from unauthorized users
// Clear relationships in database after deleting a post
