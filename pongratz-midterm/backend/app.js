const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var assert = require('assert');

const userRoutes = require("./routes/user");
const championsRoutes = require("./routes/champion");
const userinputRoutes = require("./routes/userinput");

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/pongratzMidterm", { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/champion", championsRoutes);
app.use("/api/userinput", userinputRoutes);

module.exports = app;
