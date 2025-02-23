const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, date, description } = req.body;

  try {
    const newEvent = new Event({ name, date, description });
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
