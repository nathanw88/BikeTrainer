var orm = require("../config/orm.js");

var user = {

  findFood: function (searchString, cb) {
    orm.findFood(searchString, function (res) {
      cb(res);
    })
  },

  postingFood: function (data, cb) {
    orm.postingFood(data, function (res) {
      cb(res)
    })
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("food", searchCol, val, function (res) {
      cb(res);
    });
  },

  selectFoodFK: function (table, key, cb) {
    orm.selectWhere(table, "fk_food", key, function (res) {
      cb(res);
    });
  },

  userFoodLogs: (userID, dateFrom, dateTill, limit, offset, cb)=>{

    orm.userFoodLogs(userID, dateFrom, dateTill, limit, offset, (res) => {
      cb(res);
    });
  },

  deleteUserLogs: (data, cb)=>{

    orm.deleteUserLogs(data, (res) => {
      cb(res);
    })
  }


};


module.exports = user;
