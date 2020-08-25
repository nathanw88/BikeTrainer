const express = require("express");
const router = express.Router();
const food = require("../../models/food");
const session = require("../../models/session")
require('dotenv').config();
const check = require("../../utils/check")



router.route("/findFood").post((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  const userID = parseInt(req.body.fk_user);
  if (!check.isNumber(userID)) {
    res.json({ error: "User Id Is Not A Number!" })
  }
  else if (!check.isString(req.body.searchString)) {
    res.json({ error: "Search String Not A String!" })
  }

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) {
      res.json(result)
    }
    else {
      food.findFood(req.body.searchString, function (data) {
        res.json(data);
      });
    }
  });

});

router.route("/findPortion/:fk").get((req, res) => {
  
  if (!check.isNumber(parseInt(req.params.fk))) {
    res.json({ error: "fk Isn't A Number!" })
  }
  food.selectFoodFK("food_portion", req.params.fk, function (data) {
    
    res.json(data);
  })
})

router.route("/food").post((req, res) => {
  let { fk_user, grams, fk_food, date } = req.body.data;
  let data = { fk_user, grams, fk_food, date };
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  if (!check.isNumber(data.fk_user)) {
    res.json({ error: "User ID Isn't A Number!" })
  }
  else if (!data.grams.every(check.isNumber)) {
    res.json({ error: "Not All Grams Are A Number!" })
  }
  else if (!data.fk_food.every(check.isNumber)) {
    res.json({ error: "Not All Food IDs Are A Number!" })
  }
  else if (!data.date.every(check.isDate)) {
    res.json({ error: "Date Isn't A Date!" })
  }

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