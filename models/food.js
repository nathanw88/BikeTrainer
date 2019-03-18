var orm = require("../config/orm.js");

var user = {
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("food", cols, vals, function (res) {
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
