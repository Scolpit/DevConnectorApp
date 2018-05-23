const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "profile router works!" });
});

// @route   GET api/profile
// @desc    Get current profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found";
          res.status(404).json({ errors });
        }
        res.json(profile);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

module.exports = router;
