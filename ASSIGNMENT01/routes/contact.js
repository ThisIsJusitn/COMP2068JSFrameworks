const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact", { title: "Contact Me" });
});

module.exports = router;
