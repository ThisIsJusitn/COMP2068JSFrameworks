const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact Me",
    message: "Get in touch with me",
  });
});

module.exports = router;
