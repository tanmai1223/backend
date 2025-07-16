const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.render("index", {
    title: "My website",
    content: "Welcome to my website",
    footer: "This is the footer of my website",
    year: new Date().getFullYear(),
  });
});

// Dashboard route
router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    title: "My website",
    year: new Date().getFullYear()
  });
});

// Settings route
router.get("/settings", (req, res) => {
  res.render("setting", {
    title: "My website",
    year: new Date().getFullYear()
  });
});

module.exports = router ;
