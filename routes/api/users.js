var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var user = require("../../models/users");
var session = require("../../models/session");
var nutritionPlan = require("../../models/nutritionPlan");
const check = require("../../utils/check")

router.route("/login").post((req, res) => {
  let { userPassword, userEmail } = req.body;
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let userID;
  if (!check.isString(userPassword)) {
    res.json({ error: "Password Isn't A String!" })
  }
  else if (!check.isEmail(userEmail)) {
    res.json({ error: "Email Isn't Correct!" })
  }

  user.selectWhere("userEmail", userEmail, function (result) {


    let cleanedEmail = userEmail.toLowerCase();
    // console.log(cleanedEmail)
    for (var i = 0; i < result.length; i++) {
      if (result[i].userEmail == cleanedEmail) {
        if (bcrypt.compareSync(userPassword, result[i].userPassword)) {
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
          })
        }
        else {
          session.update(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

          })
        }

      })

      res.json({ userEmail, userID });
    }
    else if (cleanedEmail === -4) {
      res.json({ error: "Incorrect Password" });
    } else {
      res.json({ error: "Email Does Not Exist" });
    }

  })


});

router.route("/register").post((req, res) => {
  let { userPassword, userEmail, userBirthday } = req.body;
  let data = { userPassword, userEmail, userBirthday }
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let userID;
  // console.log()

  if (!check.isEmail(userEmail)) {
    res.json({ error: "Invalid Email" })
  }
  else if (!check.isDate(userBirthday)) {
    res.json({ error: "Incorrect Date For Birthday!" })
  }
  else if (!check.isPassword(userPassword)) {
    console.log(userPassword)

    res.json({ error: "Invalid Password Needs To Have 8 Characters" })
  }

  else {
    user.selectWhere("userEmail", userEmail, function (result) {
      if (result == false) {
        bcrypt.hash(userPassword, 12).then(function (hash) {
          user.create(Object.keys(data), [hash, userEmail, userBirthday], function (response) {
            userID = response.insertId
            session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], function (result) {
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

router.route("/setup").post((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let data = { gender, weight, height, metric } = req.body

  if (!check.isString(data.gender)) {
    res.json({ error: "Gender Isn't A String!" })
  }
  else if (!check.isNumber(data.weight)) {
    res.json({ error: "Weight Isn't A Number!" })
  }
  else if (!check.isNumber(data.height)) {
    res.json({ error: "Height Isn't A Number!" })
  }
  else if (!data.metric === 0 || !data.metric === 1) {
    res.json({ error: "Metric Should Be A 0 Or A 1!" })
  }

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.body.userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {

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
  let userID = parseInt(req.body.id);
  if (!check.isNumber(userID)) {
    res.json({ error: "User Id Isn't A Number!" })
  }
  let nutritionPlanData = { name, description, exercise_amount } = req.body.nutritionPlanData;

  if (!(Object.values(nutritionPlanData)).every(check.isString)) {
    res.json({ error: "Name, Description, And Exercise Amount Need To Be Strings!" })
  }

  let nutritionPlanNutrients = req.body.nutritionPlanNutrients
  if (!(Object.keys(Object.keys(nutritionPlanNutrients))).every(check.isNumber)) {
    res.json({ error: "Id And Amount Of Each Nutrient Must Be A Number!" })
  }

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {
      nutritionPlan.create(["fk_user", ...Object.keys(nutritionPlanData)], [userID, ...Object.values(nutritionPlanData)], function (result2) {
        if (result2.error) {

          res.json({ error: result2.error })

        }
        nutritionPlan.createNutrients(nutritionPlanNutrients, result2.insertId, function (result3) {
          if (result3.error) {

            res.json({ error: result3.error })

          }
          user.update(["fk_active_nutrition_plan"], [result2.insertId], userID, function (result4) {
            if (result4.error) {

              res.json({ error: result4.error })

            }
            else {
              res.json([result, result2, result3, result4])
            }
          });
        });
      });
    }
  })
});

router.route("/nutritionPlan/:planID/:userID").delete((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let { userID, planID } = req.params;
  userID = parseInt(userID);
  if (!check.isNumber(userID)) {
    res.json({ error: "User ID Isn't A Number!" })
  }
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {
      nutritionPlan.delete(planID, userID, function (result2) {
        res.json(result2)
      })

    }
  });
});

router.route("/measurments/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let userID = parseInt(req.params.userID);

  if (!check.isNumber(userID)) {
    res.json({ error: "User ID Isn't A Number!" })
  }


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {

      user.selectWhere("id", userID, function (result) {

        let data = {
          gender: result[0].gender,
          weight: result[0].weight,
          height: result[0].height,
          metric: result[0].metric,
          userBirthday: result[0].userBirthday,
          nutritionPlan: {},
          nutritionPlanData: []
        }
        res.json(data)
      })
    }
  });
});

router.route("/getUserNutritionPlan/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  if (!check.isNumber(parseInt(req.params.userID))) {
    res.json({ error: "User ID Isn't A Number!" })
  }


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {

      user.selectWhere("id", req.params.userID, function (result2) {

        let data = {
          nutritionPlan: {},
          nutritionPlanData: []
        }
        if (result2[0].fk_active_nutrition_plan) {
          nutritionPlan.selectWhere("id", result2[0].fk_active_nutrition_plan, function (result3) {
            data.nutritionPlan = result3[0]
            data.nutritionPlan.description = data.nutritionPlan.description.toString();
            user.selectActiveNutritionPlan(req.params.userID, function (result4) {
              data.nutritionPlanData = [...result4];
              res.json(data)
            })
          })
        }
        else {
          // console.log(data);
          res.json(data)
        }
      })
    }

  });
});

router.route("/getMeasurements/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  if (!check.isNumber(parseInt(req.params.userID))) {
    res.json({ error: "User ID Isn't A Number!" })
  }


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {

      user.selectWhere("id", req.params.userID, function (result2) {

        let data = {
          gender: result2[0].gender,
          weight: result2[0].weight,
          height: result2[0].height,
          metric: result2[0].metric,
        }
        res.json(data)
      })
    }

  });
});

router.route("/getPersonalInfo/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  if (!check.isNumber(parseInt(req.params.userID))) {
    res.json({ error: "User ID Isn't A Number!" })
  }


  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {
      user.selectWhere("id", req.params.userID, function (result2) {
        let data = {
          userBirthday: result2[0].userBirthday,
          userEmail: result2[0].userEmail
        }
        res.json(data)
      })
    }

  });
});

router.route("/updatePersonalInfo").put((req, res) => {
  console.log(req.body)
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  let { id, userEmail, userBirthday } = req.body
  if (!check.isNumber(parseInt(id))) {
    res.json({ error: "User Id Isn't A Number!" })
  }

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], id, function (result) {

    if (result.error) {

      res.json(result);
    }

    else {
      user.update(["userEmail", "userBirthday"], [userEmail, userBirthday], id, function (result2) {

        console.log(result2)
        res.json(result2)
      })
    }

  });
});

module.exports = router;
