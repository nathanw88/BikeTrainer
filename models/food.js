var orm = require("../config/orm.js");

var user = {

  findFood: function(searchString, cb){
    orm.findFood(searchString, function(res){
      cb(res);
    })
  },
  // The variables cols and vals are arrays.
  // create: function (cols, vals, cb) {
  //   orm.create("user_food", cols, vals, function (res) {
  //     cb(res);
  //   });
  // },

  postingFood: function (data, cb){
    orm.postingFood(data, function(res){
      cb(res)
    })
  },

  // createMulti: function (array, cb) {
  //   console.log(array)
  //   orm.createMulti("food", array, function (res) {
  //     cb(res);
  //   });
  // },

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


};

// Export the database functions to route controllers.
module.exports = user;
