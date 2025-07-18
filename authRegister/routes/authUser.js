const express = require("express");
const routers = express.Router();
const bcrypt = require("bcryptjs");
const AuthUser = require("../models/authUser");

const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(404).send("Enter valid details");
  }

  if (password.length < 8) {
    return res.status(404).send("Password should be longer than 8 letters");
  }

  next();
};

routers.post("/register", validateUser, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await AuthUser.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(404)
        .json({
          message: "User already existing",
          field: existingUser.email == email ? "email" : "username",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new AuthUser({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const responseData = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    res
      .status(201)
      .json({ message: "User added sucessfully", user: responseData });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports=routers