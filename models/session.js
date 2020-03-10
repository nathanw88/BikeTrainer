
var orm = require("../config/orm.js");


var session = {
  create: function (cols, vals, cb) {
    orm.create("session", cols, vals, function (res) {
      cb(res);
    });
  },

  update: function (cols, vals, userID, cb) {
    orm.update("session", "fk_user", cols, vals, userID, function (res) {
      cb(res);
    });
  },

  checkSession: function(cols, vals, userID, cb){
    
    orm.selectWhere("session", "fk_user", userID, function (res) {
      var now = new Date();
      if(res[0].expires.getTime() > now){
        orm.update("session", "fk_user", cols, vals, userID, function (res) {
          cb(res);
        });
      }
      else{
        cb({error:"Your session has expired."})
      }
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("session", searchCol, val, function (res) {
      var now = new Date();
      // console.log(res[0].expires.getTime() > now)
      // console.log(res)
      cb(res);
    });
  }
}

module.exports = session;
