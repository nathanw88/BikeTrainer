var express = require("express");
var router = express.Router();
var session = require("../../models/session");
var nutritionPlan = require("../../models/nutritionPlan");
const check = require("../../utils/check");
const food = require("../../models/food");
const createError = require('http-errors');



router.route("/dailySum/:userID/:date").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, date } = req.params;
  if (!check.isNumber(parseInt(userID))) throw createError(400, "userID Should Be A Number")
  else if (!check.isDate(date)) throw createError(400, "date Needs To Be A Valid Date")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({ message: result.error });
    nutritionPlan.selectDailySum(userID, date, (result2) => {
      if (result2.error) return res.status(400).json({ message: result2.error });
      else{

        return res.json(result2)
      }
    });
  });
});

router.route("/averageNutrients/:userID/:dateFrom/:dateTill").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, dateFrom, dateTill } = req.params;
  userID = parseInt(userID)
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  if (!check.isDate(dateFrom) || !check.isDate(dateTill)) throw createError(400, "Dates Aren't Dates");
  else{

    session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
      if (result.error) return res.status(400).json({ message: result.error });
      nutritionPlan.selectAverageNutrients(userID, dateFrom, dateTill, (result2) => {
        if (result2.error) return res.status(400).json({ message: result2.error })
        return res.json(result2)
      });
    });
  }
});

router.route("/userNutrientsTimeline/:userID/:dateFrom/:dateTill").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, dateFrom, dateTill } = req.params;
  userID = parseInt(userID)
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  else if (!check.isDate(dateFrom) || !check.isDate(dateTill)) throw createError(400, "Dates Aren't Dates");
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({ message: result.error });
    nutritionPlan.userNutrientsTimeline(userID, dateFrom, dateTill, (result2) => {
      if (result2.error) return res.status(400).json({ message: result2.error })
      return res.json(result2)
    });
  });
});


router.route("/userFoodLogs/:userID/:dateFrom/:dateTill/:limit/:offset").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID,
  { userID, dateFrom, dateTill, limit, offset } = req.params;
  userID = parseInt(userID);
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  else if (!check.isDate(dateFrom) || !check.isDate(dateTill)) throw createError(400, "Dates Aren't Dates");
  else if (!check.isNumber(parseInt(limit)) || !check.isNumber(parseInt(offset))) throw createError(400, "limit And offset Should Be Numbers")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({ message: result.error });
    food.userFoodLogs(userID, dateFrom, dateTill, limit, offset, (result2) => { return res.json(result2) });
  });
});


router.route("/userLogs").delete((req, res) => {
  let { userID, fk_food, grams, date } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  userID = parseInt(userID);
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  else if (!check.isNumber(parseInt(fk_food))) throw createError(400, "fk_food Should Be A Number");
  else if(!check.isNumber(parseInt(grams))) throw createError(400, "grams Should Be A Number")
  else if (!check.isDate(date)) throw createError(400, "date Should Be A Date")


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) return res.status(400).json({ message: result.error });

    else food.deleteUserLogs(req.body, (result2) => { return res.json(result2) })
  });
});

module.exports = router;