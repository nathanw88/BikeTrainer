const express = require("express");
const router = express.Router();
const axios = require("axios");
const user = require("../../models/users")
const food = require("../../models/food");
const nutrient = require("../../models/nutrient");
const session = require("../../models/session")
require('dotenv').config();
const fs = require('fs')


// router.route("/bike").post((req, res) => {

//   biking.create(req.body.keys, req.body.values, function (data) {
//     res.json(data)
//   });
// });

// router.route("/run").post((req, res) => {
//   running.create(req.body.keys, req.body.values, function (data) {
//     res.json(data)
//   });
// });

// router.route("/sleep").post((req, res) => {
//   sleeping.create(req.body.keys, req.body.values, function (data) {
//     res.json(data)
//   });
// });
router.route("/findFood").post((req, res) => {
  // console.log(req)
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.body.fk_user, function (result) {
    //  console.log(result)
    if (result.error) {
      res.json(result)
    }
    else {
      food.findFood(req.body.searchString, function (data) {
        res.json(data);
      });
    }
  });
  // food.findFood(req.body.searchString, function(data){
  //   res.json(data);
  // })
});

router.route("/findPortion/:fk").get((req, res) => {
  food.selectFoodFK("food_portion", req.params.fk, function (data) {
    // console.log(data)
    res.json(data);
  })
})

router.route("/food").post((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.body.data.fk_user, function (result) {
    if (result.error) {
      res.json(result)
    }
    else {


      if (req.body.data.fk_food.length === req.body.data.grams.length) {
        food.postingFood(req.body.data, function (response) {

          res.json(response)

        })
      }

      else res.json({ error: "food and grams not matching" })


      //})
      // food.postingFood(req.body.data, function(response){
      //   console.log(response)
      //   res.json(response)
      //   // nutrient.selectFoodNutrient(req.body.data, function(data){
      //   //   console.log(data)
      //   // })
      // })
      // food.create(req.body.foodName, function (response) {
      //   let fk_food = response.insertId;
      //   nutrient.createMultiTables(req.body.array, fk_food, function (data) {
      //     res.json(data);

      //   })
    };
  });
});






// });

// function getNutrients(ndbno, cb) {
//   axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=${apiKey}`).then(function (response) {
//     console.log(response)
//     cb(response)
//   })
// }




module.exports = router;