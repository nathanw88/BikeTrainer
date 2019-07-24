var orm = require("../config/orm.js");

var user = {
  // The variables cols and vals are arrays.
  create: function (vals, cb) {
    orm.create("food", ["name"], [vals], function (res) {
      cb(res);
    });
  },

  createMulti: function (array, cb) {
    console.log(array)
    orm.createMulti("food", array, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("food", searchCol, val, function (res) {
      cb(res);
    });
  },


};

// Export the database functions to route controllers.
module.exports = user;
