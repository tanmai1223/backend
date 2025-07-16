const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParse.json());

//Database connection

mongoose
  .connect(
    "mongodb+srv://htanmai23:VrFPFThXhoCFj9pN@cuvette.4goceku.mongodb.net/?retryWrites=true&w=majority&appName=Cuvette",
    
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log(`Your application is running on http://localhost:3000`);
});
