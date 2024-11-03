/////make mongoose work/////

const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  team1Logo: String,
  team2Logo: String,
});

module.exports = mongoose.model("Game", gameSchema);
