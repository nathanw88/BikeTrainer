var orm = require("../config/orm.js");

var user = {
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("users", cols, vals, function (res) {
      cb(res);
    });
  },

  update: function(cols, vals, userID, cb){
    orm.update("users", "id", cols, vals, userID, function(res){
      cb(res)
    })
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("users", searchCol, val, function (res) {
      cb(res);
    });
  },

  selectLogs: function(userId, table, cb){
    orm.selectLogs(userId, table, function(res){
      cb(res);
    })
  }

};

// Export the database functions to route controllers.
module.exports = user;
