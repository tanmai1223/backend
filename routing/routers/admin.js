const express = require("express");
const routers = express.Router();
const isAuthenticated = require("../middleware/auth");

routers.use(isAuthenticated);

routers.get("/", (req, res) => {
  res.send("Hello world from admin");
});

routers.get("/dashboard", (req, res) => {
  res.send("This is the admin dashboard");
});

module.exports = routers;
