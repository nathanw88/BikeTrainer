var orm = require("../config/orm.js");

let nutritionPlan = {

  create: function (cols, vals, cb) {
    orm.create("nutrition_plan", cols, vals, function (res) {
      cb(res);
    });
  },

  createNutrients: function (obj, fkNutritionPlan, cb) {
    orm.postNutritionPlanNutrients(obj, fkNutritionPlan, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("nutrition_plan", searchCol, val, function (res) {
      cb(res);
    });
  },

  selectDailySum: (userID, date, cb) => {
    // console.log("models")
    orm.selectDailySum(userID, date, (res) => {
      cb(res);
    });
  },

  selectAverageMacros: (userID, dateFrom, dateTill, cb)=>{

    orm.selectAverageMacros(userID, dateFrom, dateTill, (res) => {
      cb(res);
    });
  },



};

module.exports = nutritionPlan;
