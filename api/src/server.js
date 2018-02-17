const express = require("express");
const compression = require("compression");
const apiRoutes = require("./routes/api");

const app = express();

app.use(compression());

app.use(
  "/api",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  apiRoutes
);

app.get("/", (req, res) => {
  res.json({ welcome: "hello world" });
});

module.exports = app;
