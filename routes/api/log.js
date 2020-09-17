const express = require("express"), router = express.Router(), food = require("../../models/food"),
  validate = require("../../utils/validate");
require('dotenv').config();


router.route("/findFood").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  const userID = (req.body.fk_user);
  async function validateClientData(cb) {
    if (validate.isNumber(userID) === false) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (validate.isString(req.body.searchString) === false) return res.status(400).json({ message: "searchString Should Be A String" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let findFood = () => {
    food.findFood(req.body.searchString, (data) => {
      return res.json(data);
    });
  }
  validateClientData((boolen) => {
    if (boolen === true) findFood()
  })
});

router.route("/findPortion/:fk").get((req, res) => {
  let foodFK = req.params.fk,
    validateClientData = (cb) => {
      if (!validate.isNumber(parseInt(foodFK))) return res.status(400).json({ message: "fk Isn't A Number" })
      else cb(true);
    };
  let getFoodPortions = () => {
    food.selectFoodFK("food_portion", foodFK, function (data) {
      res.json(data);
    });
  };
  validateClientData((boolen) => {
    if (boolen) getFoodPortions()
  })
})

router.route("/food").post((req, res) => {
  let { fk_user, grams, fk_food, date } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  async function validateClientData(cb) {
    if (fk_user == null || grams == null || fk_food == null || date == null) return res.status(400).json({ message: "Must Pass In fk_user, grams, date, and fk_food" })
    else if (!Array.isArray(grams) || !Array.isArray(fk_food) || !Array.isArray(date) || Array.isArray(fk_user)) return res.status(400).json({ message: "grams fk_food and date Should Be Arrays While fk_user Should Be A Number" })
    else if (!validate.isNumber(parseInt(fk_user))) return res.status(400).json({ message: "fk_user Should Be A Number" })
    else if (!grams.every(validate.isNumber)) return res.status(400).json({ message: "Not All Grams Are Numbers" })
    else if (!fk_food.every(validate.isNumber)) return res.status(400).json({ message: "Not All Food Ids Are Numbers" })
    else if (!date.every(validate.isDate)) return res.status(400).json({ message: "Dates Aren't Dates" })
    else if ((fk_food.length === grams.length && grams.length === date.length) === false) return res.status(400).json({ message: "The Numer Of Food Ids, Grams, or Dates Not Matching" })
    else if (await validate.isSessionExpired(sessionID, sessionExpires, fk_user)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  }
  let data = { fk_user, grams, fk_food, date },
    postFood = () => {
      food.postingFood(data, function (response) {
        if (response.error) return res.status(400).json({ message: response.error })
        return res.json(response)
      })

    }
  validateClientData((boolen) => {
    if (boolen) postFood()
  });
});

module.exports = router;