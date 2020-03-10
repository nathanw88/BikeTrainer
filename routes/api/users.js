var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var user = require("../../models/users");
var session = require("../../models/session");
var validator = require("email-validator");

router.route("/login").post((req, res) => {
  // console.log(req.sessionID)
  // console.log(req.session.cookie._expires)
  let password = req.body.userPassword;
  let userEmail = req.body.userEmail;
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let userID;

  user.selectWhere("userEmail", userEmail, function (result) {
    if (!validator.validate(userEmail)) {
      res.json({ error: "Invalid Email" })
    }
    else if (validator.validate(userEmail)) {
      let cleanedEmail = userEmail.toLowerCase();
      // console.log(cleanedEmail)
      for (var i = 0; i < result.length; i++) {
        if (result[i].userEmail == cleanedEmail) {
          if (bcrypt.compareSync(password, result[i].userPassword)) {
            userID = result[i].id;
          } else {
            cleanedEmail = -4;
          }
          break;
        }
      }

      if (cleanedEmail && userID) {
        session.selectWhere("fk_user", userID, function (result) {
          if (result.length === 0) {
            session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], function (result) {
            //  console.log(result);
            })
          }
          else {
            session.update(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
              // console.log(result);
            })
          }
          // console.log(result);
        })

        res.json({ userEmail, userID });
      } else if (cleanedEmail === -4) {
        res.json({ error: "Incorrect Password" });
      } else {
        res.json({ error: "Email Does Not Exist" });
      }
    }
  })


})

router.route("/register").post((req, res) => {
  const regex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
  let userPassword = req.body.userPassword;
  let userEmail = req.body.userEmail;
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let userID;
  // console.log()

  if (!validator.validate(userEmail)) {
    res.json({ error: "Invalid Email" })
  }
  else if (!userPassword.match(regex)) {
    console.log(userPassword)
    res.json({ error: "Invalid Password Needs To Have A Special Character, Number And, Letter(Uppercase And Lowercase) With A Legnth Of 8 Characters" })
  }
  else {
    user.selectWhere("userEmail", userEmail, function (result) {
      if (result == false) {
        bcrypt.hash(userPassword, 12).then(function (hash) {
          user.create(Object.keys(req.body), [userEmail, hash, req.body.userBirthday], function (response) {
            // console.log(response)
            userID = response.insertId
            // console.log(userID)
            session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], function (result) {
              // console.log(result);
            })
            res.json(response)
          })
        })
      }
      else {
        res.json({ error: "Email Already Registered" })
      }
    })
  }
})


module.exports = router;
