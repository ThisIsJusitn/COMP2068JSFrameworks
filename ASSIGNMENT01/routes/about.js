const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", {
    title: "About Me",
    message: "This is the About Me page",
  });
});

module.exports = router;