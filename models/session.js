var orm = require("../config/orm.js");


var session = {
  create: function (cols, vals, cb) {
    orm.create("session", cols, vals, function (res) {
      cb(res);
    });
  },

  delete: function (userID, cb) {
    orm.delete("session", ["fk_user"], [userID], function (res) {
      cb(res);
    });
  },

  update: function (cols, vals, userID, cb) {
    orm.update("session", "fk_user", cols, vals, userID, function (res) {
      cb(res);
    });
  },

  checkSession: function (cols, vals, userID, cb) {
    let clientsSessionID = vals[0];
    orm.selectWhere("session", "fk_user", userID, function (res) {
      if (res[0]) {
        var databaseSessionID = res[0].session_id, now = new Date();
        if (res[0].expires.getTime() > now && clientsSessionID === databaseSessionID) {
          orm.update("session", "fk_user", cols, vals, userID, function (res) {
            cb(res);
          });
        }
        else return cb({ error: "Your session has expired." })
      }
      else return cb({ error: "Your session has expired." })
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("session", searchCol, val, function (res) {
      var now = new Date();
      cb(res);
    });
  }
}

module.exports = session;
