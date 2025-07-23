const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const LoginData = require("../models/login");

const routers = express.Router();
const JWT_SECRET = "SECRET"; // use process.env.JWT_SECRET in production

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // decoded payload
    next();
  } catch (err) {
    res.status(403).send("Invalid or expired token");
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access restricted to admin only");
  }
  next();
}

// ✅ Register
routers.post("/register", async (req, res) => {
  try {
    const { username, password ,role } = req.body;

    const existingUser = await LoginData.findOne({ username });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new LoginData({
      username,
      password: hashedPassword,
      role:role
    });

    await userData.save();

    res.status(201).json({
      message: "User created successfully!",
      data: {
        id: userData._id,
        username: userData.username,
        role: userData.role,
        createdAt: userData.createdAt,
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ✅ Login
routers.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await LoginData.findOne({ username });

  if (!existingUser) {
    return res.status(401).send("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    {
      username: existingUser.username,
      role: existingUser.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

routers.get('/profile',verifyToken,(req,res)=>{
    res.send(`Welcome User ${req.user.username}`)
})

// ✅ Protected Admin Route (example)
routers.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.send(`Welcome Admin ${req.user.username}`);
});

module.exports = routers;
