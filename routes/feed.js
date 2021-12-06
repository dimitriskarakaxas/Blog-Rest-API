const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// GET => /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

// POST => /feed/post
router.post(
  "/post",
  isAuth,
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
  feedController.createPost
);

// GET => /feed/:postId
router.get("/post/:postId", isAuth, feedController.getPost);

// PUT => /feed/:postId
router.put(
  "/post/:postId",
  isAuth,
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
  feedController.updatePost
);

// DELETE => /feed/:postId
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
