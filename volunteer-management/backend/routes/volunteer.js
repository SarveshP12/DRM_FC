const express = require("express");
const Volunteer = require("../models/Volunteer");

const router = express.Router();

router.get("/", async (req, res) => {
  const volunteers = await Volunteer.find().populate("user");
  res.json(volunteers);
});

module.exports = router;
