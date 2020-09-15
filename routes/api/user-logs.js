const express = require("express"), router = express.Router(), nutritionPlan = require("../../models/nutritionPlan")
validate = require("../../utils/validate"), food = require("../../models/food");

router.route("/dailySum/:userID/:date").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, date } = req.params;
  async function validateClientData(cb) {
    if (!validate.isNumber(parseInt(userID))) return res.status(400).json({ message: "userID Should Be A Number" })
    else if (!validate.isDate(date)) return res.status(400).json({ message: "date Needs To Be A Valid Date" })
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  validateClientData((boolen) => {
    if (boolen === true) {
      nutritionPlan.selectDailySum(userID, date, (result2) => {
        if (result2.error) return res.status(400).json({ message: result2.error });
        else return res.json(result2)
      });
    }
  });
});

router.route("/averageNutrients/:userID/:dateFrom/:dateTill").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, dateFrom, dateTill } = req.params;
  userID = parseInt(userID)
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isDate(dateFrom) || !validate.isDate(dateTill)) return res.status(400).json({ message: "Dates Aren't Dates" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  validateClientData((boolen) => {
    if (boolen === true){
      nutritionPlan.selectAverageNutrients(userID, dateFrom, dateTill, (result2) => {
        if (result2.error) return res.status(400).json({ message: result2.error })
        return res.json(result2)
      });
    }
  });

});

router.route("/userNutrientsTimeline/:userID/:dateFrom/:dateTill").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, dateFrom, dateTill } = req.params;
  userID = parseInt(userID)
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isDate(dateFrom) || !validate.isDate(dateTill)) return res.status(400).json({ message: "Dates Aren't Dates" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  validateClientData((boolen) => {
    if (boolen === true) {
      nutritionPlan.userNutrientsTimeline(userID, dateFrom, dateTill, (result2) => {
        if (result2.error) return res.status(400).json({ message: result2.error })
        return res.json(result2)
      });
    }
  });
});


router.route("/userFoodLogs/:userID/:dateFrom/:dateTill/:limit/:offset").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID,
    { userID, dateFrom, dateTill, limit, offset } = req.params;
  userID = parseInt(userID);
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isDate(dateFrom) || !validate.isDate(dateTill)) return res.status(400).json({ message: "Dates Aren't Dates" });
    else if (!validate.isNumber(parseInt(limit)) || !validate.isNumber(parseInt(offset))) return res.status(400).json({ message: "limit And offset Should Be Numbers" })
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  validateClientData((boolen) => {
    if (boolen === true) food.userFoodLogs(userID, dateFrom, dateTill, limit, offset, (result2) => { return res.json(result2) });
  });
});


router.route("/userLogs").delete((req, res) => {
  let { userID, fk_food, grams, date } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  userID = parseInt(userID);
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isNumber(parseInt(fk_food))) return res.status(400).json({ message: "fk_food Should Be A Number" });
    else if (!validate.isNumber(parseInt(grams))) return res.status(400).json({ message: "grams Should Be A Number" });
    else if (!validate.isDate(date)) return res.status(400).json({ message: "date Should Be A Date" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  validateClientData((boolen) => {
    if (boolen === true) food.deleteUserLogs(req.body, (result2) => { return res.json(result2) })
  });
});

module.exports = router;