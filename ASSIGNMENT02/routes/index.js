const express = require("express");
const multer = require("multer");
const passport = require("passport");
const Game = require("../models/Game");
const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

// Middleware to restrict access to authenticated users
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/github");
}

// Home - List games
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.render("index", { games });
});

// Add a new game
router.post(
  "/games",
  ensureAuthenticated,
  upload.fields([{ name: "team1Logo" }, { name: "team2Logo" }]),
  async (req, res) => {
    const { team1, team2 } = req.body;
    const team1Logo = req.files["team1Logo"]
      ? `/uploads/${req.files["team1Logo"][0].filename}`
      : null;
    const team2Logo = req.files["team2Logo"]
      ? `/uploads/${req.files["team2Logo"][0].filename}`
      : null;

    await Game.create({ team1, team2, team1Logo, team2Logo });
    res.redirect("/");
  }
);

// Update score
router.post("/games/:id/score", ensureAuthenticated, async (req, res) => {
  const { score1, score2 } = req.body;
  await Game.findByIdAndUpdate(req.params.id, { score1, score2 });
  res.redirect("/");
});

// Delete game
router.post("/games/:id/delete", ensureAuthenticated, async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Search by team name
router.get("/search", async (req, res) => {
  const searchQuery = req.query.q;
  const games = await Game.find({
    $or: [
      { team1: { $regex: searchQuery, $options: "i" } },
      { team2: { $regex: searchQuery, $options: "i" } },
    ],
  });
  res.render("index", { games });
});

// GitHub Auth Routes
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
