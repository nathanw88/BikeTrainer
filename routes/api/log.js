const express = require("express");
const router = express.Router();
const axios = require("axios");
const running = require("../../models/running")
const biking = require("../../models/biking")
const sleeping = require("../../models/sleeping")
const food = require ("../../models/food")

router.route("/bike").post((req, res) => {
  console.log(req.body)
biking.create(req.body.keys, req.body.values, function(data){
res.json(data)
})
})

router.route("/run").post((req, res) => {
  console.log(req.body)
running.create(req.body.keys, req.body.values, function(data){
res.json(data)
})
})

router.route("/sleep").post((req, res) => {
  console.log(req.body)
sleeping.create(req.body.keys, req.body.values, function(data){
res.json(data)
})
})

router.route("/food").post((req, res) => {
  console.log(req.body)
food.create(req.body.keys, req.body.values, function(data){
res.json(data)
})
})




module.exports = router;