const express = require("express");
const router = express.Router();
const axios = require("axios");
const user = require("../../models/users")
const food = require("../../models/food");
const nutrient = require("../../models/nutrient");
const session = require("../../models/session")
require('dotenv').config();
const fs = require('fs')
const check = require("../../utils/check")


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
  if(!check.isNumber(req.body.fk_user)){
    res.json({error: "User Id Is Not A Number!"})

  }

  else if (!check.isString(req.body.searchString)){
    res.json({error:"Search String Not A String!"})
  }

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
  if(!check.isNumber(req.params.fk)){
    res.json({error: "fk Isn't A Number!"})
  }
  food.selectFoodFK("food_portion", req.params.fk, function (data) {
    // console.log(data)
    res.json(data);
  })
})

router.route("/food").post((req, res) => {

  let { fk_user, grams, fk_food, date } = req.body.data;
  let data = { fk_user, grams, fk_food, date };

  if(!check.isNumber(data.fk_user)){
    res.json({error: "User ID Isn't A Number!"})
  }
  else if (!data.grams.every(check.isNumber)){
    res.json({error: "Not All Grams Are A Number!"})
  }
  else if (!data.fk_food.every(check.isNumber)){
    res.json({error: "Not All Food IDs Are A Number!"})
  }
  else if (!data.date.every(check.isDate)){
    res.json({error: "Date Isn't A Date!"})
  }

  // console.log(data)
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], data.fk_user, function (result) {
    if (result.error) {
      res.json(result)
    }
    else {


      if (data.fk_food.length === data.grams.length) {
        food.postingFood(data, function (response) {

          res.json(response)

        })
      }

      else res.json({ error: "food and grams not matching" })

    };
  });
});

module.exports = router;