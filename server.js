var express = require("express");
require("dotenv").config()
const routes = require("./routes");
var app = express();
require('dotenv').config();
var session = require('express-session');
var bodyParser = require("body-parser");
const uuid = require('uuid/v4');
var MemoryStore = require('memorystore')(session);
const PORT = process.env.PORT || 8080;

app.use(session({
  genid: (req) => {
    // console.log('Inside the session middleware')
    // console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  cookie: { maxAge: 3600000 },
  store: new MemoryStore({
    checkPeriod: 3600000 // prune expired entries every 1h
  }),
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true
}));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  // Sets HTTP status code
  let status = error.status || 500
  res.status(status)
  // Sends response
  res.json({
    status: status,
    message: error.message,
    stack: error.stack
  })
})

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

module.exports = app