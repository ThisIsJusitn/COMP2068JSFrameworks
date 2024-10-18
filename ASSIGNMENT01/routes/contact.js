const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.render("contact", {
      title: "Contact Me",
      message: "Get in touch with me",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
