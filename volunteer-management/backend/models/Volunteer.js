const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTasks: [String],
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);
