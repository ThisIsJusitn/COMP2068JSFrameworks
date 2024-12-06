const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  team1Logo: String,
  team2Logo: String,
});

module.exports = mongoose.model("Game", gameSchema);
