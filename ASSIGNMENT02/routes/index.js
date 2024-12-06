const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Game = require("../models/Game");
const router = express.Router();

const upload = multer({
  dest: "public/uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

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
  [
    body("team1").notEmpty().withMessage("Team 1 name is required."),
    body("team2").notEmpty().withMessage("Team 2 name is required."),
    body("score1").isNumeric().withMessage("Score 1 must be a number."),
    body("score2").isNumeric().withMessage("Score 2 must be a number."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array().map((err) => err.msg).join(", "));
      return res.redirect("/");
    }

    const { team1, team2 } = req.body;
    const team1Logo = req.files["team1Logo"]
      ? `/uploads/${req.files["team1Logo"][0].filename}`
      : null;
    const team2Logo = req.files["team2Logo"]
      ? `/uploads/${req.files["team2Logo"][0].filename}`
      : null;

    await Game.create({ team1, team2, team1Logo, team2Logo });
    req.flash("success", "Game added successfully!");
    res.redirect("/");
  }
);

// Update score
router.post("/games/:id/score", ensureAuthenticated, async (req, res) => {
  const { score1, score2 } = req.body;
  await Game.findByIdAndUpdate(req.params.id, { score1, score2 });
  req.flash("success", "Score updated successfully!");
  res.redirect("/");
});

// Delete game
router.post("/games/:id/delete", ensureAuthenticated, async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  req.flash("success", "Game deleted successfully!");
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
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
