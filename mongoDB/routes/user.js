const express = require("express");
const routers = express.Router();
const User = require("../models/user");

routers.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports=routers;
