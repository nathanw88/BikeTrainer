var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var user = require("../../models/users");
var session = require("../../models/session");
var validator = require("email-validator");
var nutritionPlan = require("../../models/nutritionPlan");


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
              console.log(result);
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


});

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
});

router.route("/profile/:userID/:date").get((req, res)=>{
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  // console.log("here")

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      if (result.error === "Your session has expired") {
        res.redirect('/')

      };
    }

    else {
      nutritionPlan.selectActivePlan(req.params.userID,  req.params.date, (result2)=>{
        // console.log(result2);
        res.json(result2)
      });
    }
  });


});


router.route("/setup").post((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  console.log(req.body);

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.body.userID, function (result) {

    if (result.error) {

      if (result.error === "Your session has expired") {
        res.redirect('/')

      };
    }

    else {
      let data = req.body
      console.log(req.body)

      user.update(["gender", "weight", "height", "metric"], [data.gender, data.weight, data.height, data.metric], data.userID, function (result) {

        if (result.error) {

          res.json({ error: result.error })

        }
        else res.json(result);

      });
    };
  });
});

router.route("/nutritionPlan").post((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  // console.log(req.body);

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.body.id, function (result) {

    if (result.error) {

      if (result.error === "Your session has expired") {
        res.redirect('/')

      };
    } 

    else {
      nutritionPlan.create(["fk_user", ...Object.keys(req.body.nutritionPlanData)],[req.body.id, ...Object.values(req.body.nutritionPlanData)], function(result2){
        if (result2.error) {

          res.json({ error: result2.error })

        }
        nutritionPlan.createNutrients(req.body.nutritionPlanNutrients, result2.insertId, function (result3){
          if (result3.error) {

            res.json({ error: result3.error })
  
          }
          user.update(["fk_active_nutrition_plan"], [result2.insertId], req.body.id, function(result4){
            // console.log(result4)
            if (result4.error) {

              res.json({ error: result4.error })
    
            }
            else{
              res.json([result, result2, result3, result4])
            }
          });
          // console.log(result3)
        });
        // console.log(result2.insertId)
        
      });

      
    }
  })
})

router.route("/measurments/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      if (result.error === "Your session has expired") {
        res.redirect('/')

      };
    }

    else {

      user.selectWhere("id", req.params.userID, function (result) {

        let data = {
          gender: result[0].gender,
          weight: result[0].weight,
          height: result[0].height,
          metric: result[0].metric,
          userBirthday: result[0].userBirthday,
          nutritionPlan: {}
        }
        if (result[0].fk_active_nutrition_plan) {
          nutritionPlan.selectWhere("id", result[0].fk_active_nutrition_plan, function (result2) {

            data.nutritionPlan = result2[0]

          })

        }
        // console.log(data);
        res.json(data)
      })
    }

  });
});

module.exports = router;
