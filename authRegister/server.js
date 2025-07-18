const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routers = require("./routes/authUser");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://htanmai23:VrFPFThXhoCFj9pN@cuvette.4goceku.mongodb.net/?retryWrites=true&w=majority&appName=Cuvette"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", routers);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server crash" });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log(`Your project is running on http://localhost:3000`);
});
