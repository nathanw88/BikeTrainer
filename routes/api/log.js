const express = require("express"), router = express.Router(), food = require("../../models/food"), session = require("../../models/session"),
check = require("../../utils/check"), createError = require('http-errors');
require('dotenv').config();


router.route("/findFood").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  const userID = parseInt(req.body.fk_user);
  if (!check.isNumber(userID) || Array.isArray(req.body.fk_user)) throw createError(400, "userID Should Be A Number")
  else if (!check.isString(req.body.searchString)) throw createError(400, "searchString Should Be A String")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
      food.findFood(req.body.searchString, function (data) {return res.json(data);});
  });
});

router.route("/findPortion/:fk").get((req, res) => {
  if (!check.isNumber(parseInt(req.params.fk))) throw createError(400, "fk Isn't A Number" )
  food.selectFoodFK("food_portion", req.params.fk, function (data) {
    res.json(data);
  })
})

router.route("/food").post((req, res) => {
  let { fk_user, grams, fk_food, date } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  if (fk_user == null || grams == null || fk_food == null || date == null) throw createError(400, "Must Pass In fk_user, grams, date, and fk_food")
  else if (!Array.isArray(grams) || !Array.isArray(fk_food) || !Array.isArray(date) || Array.isArray(fk_user)) throw createError(400, "grams fk_food and date Should Be Arrays While fk_user Should Be A Number")
  else if (!check.isNumber(parseInt(fk_user))) throw createError(400, "fk_user Should Be A Number" )
  else if (!grams.every(check.isNumber)) throw createError(400, "Not All Grams Are Numbers")
  else if (!fk_food.every(check.isNumber))throw createError(400, "Not All Food Ids Are Numbers")
  else if (!date.every(check.isDate)) throw createError(400, "Dates Aren't Dates")
  let data = { fk_user, grams, fk_food, date }
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], data.fk_user, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
      if (data.fk_food.length === data.grams.length && data.grams.length === data.date.length ) {
        food.postingFood(data, function (response) {
          if (response.error) return res.status(400).json({message: response.error}) 
           return res.json(response)
          })
      }
      else  return res.status(400).json({ message: "The Numer Of Food Ids, Grams, or Dates Not Matching" })
    
  });
});

module.exports = router;