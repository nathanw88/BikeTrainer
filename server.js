var express = require("express");
require("dotenv").config()
const routes = require("./routes");
var app = express();
require('dotenv').config();
var session = require('express-session');
var bodyParser = require("body-parser");
const uuid = require('uuid/v4');
var MemoryStore = require('memorystore')(session);
var orm = require("./config/orm")
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


// // Configure body parser for AJAX requests
// app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// app.use(session({ secret: process.env.session_secret }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "Diet-1548649358.us-east-2.elb.amazonaws.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// orm.Nutrients();

app.use(routes);

;

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
