const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "profile router works!" });
});

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public

module.exports = router;
