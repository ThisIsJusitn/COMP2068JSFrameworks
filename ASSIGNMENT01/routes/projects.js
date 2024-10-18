const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.render("projects", {
      title: "Projects",
      message: "These are my projects",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
