const express = require("express");
const app = express();
const school_route  = require("./schoolRoute/index");

app.use("/school",school_route);

module.exports = app;