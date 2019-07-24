const express = require("express");
const router = express.Router();
const axios = require("axios");
const running = require("../../models/running");
const biking = require("../../models/biking");
const sleeping = require("../../models/sleeping");
const food = require("../../models/food");
const nutrient = require("../../models/nutrient");
require('dotenv').config();


router.route("/bike").post((req, res) => {

  biking.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/run").post((req, res) => {
  running.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/sleep").post((req, res) => {
  sleeping.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/food").post((req, res) => {

  food.create(req.body.foodName, function (response) {
    let fk_food = response.insertId;
    nutrient.createMulti(req.body.array, fk_food, function (data) {
      res.json(data)
      
    })
  })



});

// function getNutrients(ndbno, cb) {
//   axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=${apiKey}`).then(function (response) {
//     console.log(response)
//     cb(response)
//   })
// }




module.exports = router;