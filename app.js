const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

// define the route your test expects
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

module.exports = app;
