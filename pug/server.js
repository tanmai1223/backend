const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render('index', {
    title: "My website",
    message: "Welcome",
    user: {
      name: "Tanmai",
    },
  });
});

app.listen(3000, () => {
  console.log(`Your code is running on http://localhost:3000`);
});
