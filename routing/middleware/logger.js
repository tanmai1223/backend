const express = require("express");

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}],${req.method},${req.url}`);
  console.log("Header", req.headers);
  console.log("Body", req.body);
  next();
};

module.exports = logger;
