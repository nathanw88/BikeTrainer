var orm = require("../config/orm.js");

var user = {
  // The variables cols and vals are arrays.
  createMulti: function (array, fk, cb) {
    orm.createMulti("nutrient", array, fk, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("nutrient", searchCol, val, function (res) {
      cb(res);
    });
  },


};

// Export the database functions to route controllers.
module.exports = user;
