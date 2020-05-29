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

  selectActivePlan: (userID, date, cb) => {
    // console.log("models")
    orm.selectActivePlan(userID, date, (res) => {
      cb(res)
    })
  }


};

module.exports = nutritionPlan;
