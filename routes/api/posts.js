const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "posts router works!" });
});

// @route   GET api/posts/
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(profiles => res.json(profiles))
    .catch(err => res.status(404).json({ nopostsfound: "Posts not found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(404).json({ nopostfound: "Post not found" }));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ _id: req.params.id, user: req.user.id })
      .then(post => {
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(401).json({ nopostfound: "Not authorized" }));
  }
);

// @route   Post api/posts/
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post by id
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        myLikeArray = post.likes.filter(
          like => like.user.toString() === req.user.id
        );

        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        post.likes.push({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json({ postnotfound: "Post not found" }));
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post by id
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not liked this post" });
        }

        const indexToRemove = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        post.likes.splice(indexToRemove, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json({ postnotfound: "Post not found" }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Comment post by post id
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };

        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => {
        res.status(404).json({ postnotfound: "Post not found" });
      });
  }
);

module.exports = router;
