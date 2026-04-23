// app.js — input file

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

// connect the middleware, routes, etc...

app.listen(3000);
