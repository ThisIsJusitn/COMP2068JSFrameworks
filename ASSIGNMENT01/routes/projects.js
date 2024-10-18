const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("projects", {
    title: "Projects",
    message: "These are my projects",
  });
});

module.exports = router;
