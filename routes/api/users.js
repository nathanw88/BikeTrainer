var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var user = require("../../models/users");
var session = require("../../models/session");
var nutritionPlan = require("../../models/nutritionPlan");
const check = require("../../utils/check")
const createError = require('http-errors')

router.route("/login").post((req, res) => {
  let { userPassword, userEmail } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID;
  if (userEmail === undefined || userPassword === undefined) throw createError(400, "Data must include userPassword and userEmail")
  if (!check.isString(userPassword)) throw createError(400, "Password Isn't A String")
  else if (!check.isEmail(userEmail)) throw createError(400, "Email Isn't Correct")
  let lowercaseEmail = userEmail.toLowerCase();
  user.selectWhere("userEmail", lowercaseEmail, function (result) {
    if (result.length === 0) return res.status(400).json({ message: "Email Does Not Exist" })
    let databasePassword = result[0].userPassword;
    if (bcrypt.compareSync(userPassword, databasePassword)) userID = result[0].id;
    else return res.status(400).json({ message: "Incorrect Password" })
    session.selectWhere("fk_user", userID, function (result) {
      if (result.length === 0) session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], (result) => { })
      else session.update(["session_id", "expires"], [sessionID, sessionExpires], userID, (result) => { })
      return res.json({ userEmail, userID });
    })
  })
});

router.route('/logout').delete((req, res) => {
  let userID = req.body.userID
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number")
  session.delete(userID, function (result) {
   return res.json(result)
  })
})

router.route("/register").post((req, res) => {
  let { userPassword, userEmail, userBirthday } = req.body, lowercaseEmail = userEmail.toLowerCase(), salt = 12, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID;
  if (userEmail === undefined || userPassword === undefined || userBirthday === undefined) throw createError(400, "Input must have userEmail, userPassword, and userBirthday");
  if (!check.isEmail(userEmail)) throw createError(400, "Email Isn't Correct")
  else if (!check.isDate(userBirthday)) throw createError(400, "Incorrect Date For Birthday")
  else if (!check.isPassword(userPassword)) throw createError(400, "Invalid Password Needs To Have 8 Characters")
  user.selectWhere("userEmail", lowercaseEmail, function (result) {
    if (result.length === 0) {
      bcrypt.hash(userPassword, salt).then(function (hashedPassword) {
        user.create(["userPassword", "userEmail", "userBirthday"], [hashedPassword, lowercaseEmail, userBirthday], function (response) {
          userID = response.insertId
          session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], function (result) {
          })
          return res.json(response);
        });
      });
    }
    else return res.status(400).json({ message: "Email Already Registered" });
  })
});

router.route("/deleteTestUser").delete((req, res) => {
  let { userPassword, userEmail } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID;
  if (userEmail === undefined || userPassword === undefined) throw createError(400, "Data must include userPassword and userEmail")
  if (!check.isString(userPassword)) throw createError(400, "Password Isn't A String")
  else if (!check.isEmail(userEmail)) throw createError(400, "Email Isn't Correct")
  let lowercaseEmail = userEmail.toLowerCase();
  user.selectWhere("userEmail", lowercaseEmail, function (result) {
    if (result.length === 0) return res.status(400).json({ message: "Email Does Not Exist" })
    let databasePassword = result[0].userPassword;
    if (bcrypt.compareSync(userPassword, databasePassword)) userID = result[0].id;
    else return res.status(400).json({ message: "Incorrect Password" })
    if (userID) {
      user.deleteTestUser(["id"], [userID], function (deletedRow) {
        return res.json({ message: `Deleted User ${lowercaseEmail}` });
      })
    }
  })
});

router.route("/setup").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.body.userID), data = { gender, weight, height, metric } = req.body
  if (!check.isString(data.gender)) throw createError(400, "Gender Isn't A String")
  else if (!check.isNumber(data.weight)) throw createError(400, "Weight Isn't A Number")
  else if (!check.isNumber(data.height)) throw createError(400, "Height Isn't A Number")
  else if (!data.metric === 0 || !data.metric === 1 || data.metric == undefined) throw createError(400, "Metric Should Be 0 Or 1")
  else if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({ message: result.error });
    else {
      user.update(["gender", "weight", "height", "metric"], [data.gender, data.weight, data.height, data.metric], data.userID, function (result) {
        if (result.error) return res.status(400).json({ message: result.error });
        return res.json(result);
      });
    };
  });
});

router.route("/nutritionPlan").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.body.id);
  if (req.body.nutritionPlanData === undefined || req.body.nutritionPlanData === null) throw createError(400, "nutritionPlanData Needs To Have name, descripption, and exercise_amount");
  else if (req.body.nutritionPlanNutrients === undefined || req.body.nutritionPlanNutrients === null) throw createError(400, "nutritionPlanNutrients Must Contain Nutrients With id and amount For Each");
  let nutritionPlanData = { name, description, exercise_amount } = req.body.nutritionPlanData, nutritionPlanNutrients = req.body.nutritionPlanNutrients;
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  else if (!(Object.values(nutritionPlanData)).every(check.isString)) throw createError(400, "Name, Description, And Exercise Amount Need To Be Strings");

  Object.values(nutritionPlanNutrients).forEach(nutrientObject => {
    if (!Object.values(nutrientObject).every(check.isNumberString)) throw createError(400, "id And Amount Of Each Nutrient Must Be A Number");
  })
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
    else {
      nutritionPlan.create(["fk_user", ...Object.keys(nutritionPlanData)], [userID, ...Object.values(nutritionPlanData)], function (result2) {
        if (result2.error) return res.status(400).json({ message: result2.error });
        nutritionPlan.createNutrients(nutritionPlanNutrients, result2.insertId, function (result3) {
          if (result3.error) return res.status(400).json({ message: result3.error });
          user.update(["fk_active_nutrition_plan"], [result2.insertId], userID, function (result4) {
            if (result4.error) return res.status(400).json({ message: result4.error });
            return res.json(result2);
          });
        });
      });
    };
  });
});

router.route("/nutritionPlan/:planID/:userID").delete((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, planID } = req.params;
  userID = parseInt(userID), planID = parseInt(planID)
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  if (!check.isNumber(planID)) throw createError(400, "planID Should Be A Number");
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
    else nutritionPlan.delete(planID, userID, (result2) => {
      if (result2.error) return res.status(400).json({meesage: result2.error})
      else if (result2.affectedRows === 0) return res.status(400).json({message: "No nutrition plan to delete"})
      else return res.json(result2);
    })
  });
});

router.route("/measurements/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.params.userID);
  if (!check.isNumber(userID)) throw createError(400, "userID Should Be A Number");
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
    else {
      user.selectWhere("id", userID, function (result) {
        let data = {
          gender: result[0].gender,
          weight: result[0].weight,
          height: result[0].height,
          metric: result[0].metric,
          userBirthday: result[0].userBirthday,
        }
        return res.json(data)
      })
    }
  });
});

router.route("/nutritionPlan/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  if (!check.isNumber(parseInt(req.params.userID))) throw createError(400, "userID Should Be A Number")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {
    if (result.error) res.status(400).json({ message: result.error });
    else {
      user.selectWhere("id", req.params.userID, function (result2) {
        let data = { nutritionPlan: {}, nutritionPlanData: [] }
        if (result2[0].fk_active_nutrition_plan) {
          nutritionPlan.selectWhere("id", result2[0].fk_active_nutrition_plan, function (result3) {
            data.nutritionPlan = result3[0]
            data.nutritionPlan.description = data.nutritionPlan.description.toString();
            user.selectActiveNutritionPlan(req.params.userID, function (result4) {
              data.nutritionPlanData = [...result4];
              return res.json(data)
            })
          })
        }
        else return res.status(400).json({ message: "User Has No Active Nutrition Plan" })
      })
    }

  });
});

router.route("/personalInfo/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  if (!check.isNumber(parseInt(req.params.userID))) throw createError(400, "userID Should Be A Number");
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {
    if (result.error) return res.status(400).json({ message: result.error });
    user.selectWhere("id", req.params.userID, function (result2) {
      let data = {
        userBirthday: result2[0].userBirthday,
        userEmail: result2[0].userEmail
      }
      return res.json(data);
    });
  });
});

router.route("/personalInfo").put((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, userEmail, userBirthday } = req.body
  if(userID == null || userEmail == null || userBirthday == null) throw createError(400, "Data must contain userID, userEmail, and userBirthday" )
  else if (!check.isNumber(parseInt(userID))) throw createError(400, "userID Should Be A Number" )
  else if (!check.isEmail(userEmail)) throw createError(400, "Email Isn't Correct")
  else if(!check.isDate(userBirthday)) throw createError(400, "Incorrect Date For Birthday")
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {
    if (result.error) return res.status(400).json({message: result.error});
      user.update(["userEmail", "userBirthday"], [userEmail, userBirthday], userID, function (result2) {
        return res.json(result2)
      });
  });
});

module.exports = router;
