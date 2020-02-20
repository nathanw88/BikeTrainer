var express = require("express");
require ("dotenv").config()
const routes = require("./routes");
var app = express();
require('dotenv').config()
var session = require('express-session')
const uuid = require('uuid/v4')
var MemoryStore = require('memorystore')(session)

const PORT = process.env.PORT || 8080;

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  cookie: { maxAge: 3600000 },
    store: new MemoryStore({
      checkPeriod: 3600000 // prune expired entries every 1h
    }),
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true
}))


// Configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



app.use(routes);



// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
