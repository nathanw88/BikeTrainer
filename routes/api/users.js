const express = require("express"), router = express.Router(), bcrypt = require('bcrypt'), user = require("../../models/users"),
  nutritionPlan = require("../../models/nutritionPlan"), validate = require("../../utils/validate"), session = require("../../models/session");


router.route("/login").post((req, res) => {
  let { userPassword, userEmail } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID;
  validateClientData = (cb) => {
    if (userEmail === undefined || userPassword === undefined) return res.status(400).json({ message: "Data must include userPassword and userEmail" });
    else if (!validate.isString(userPassword)) return res.status(400).json({ message: "Password Isn't A String" });
    else if (!validate.isEmail(userEmail)) return res.status(400).json({ message: "Email Isn't Correct" });
    else cb(true)
  },
    checkIfUserExsist = (userEmail) => {
      let lowercaseEmail = userEmail.toLowerCase();
      user.selectWhere("userEmail", lowercaseEmail, function (result) {
        if (result.length === 0) return res.status(400).json({ message: "Email Does Not Exist" })
        let databasePassword = result[0].userPassword, userID = result[0].id
        checkIfPasswordMatches(databasePassword, userID)
      });
    },
    checkIfPasswordMatches = (databasePassword, userID) => {
      if (bcrypt.compareSync(userPassword, databasePassword)) createSession(userEmail, userID)
      else return res.status(400).json({ message: "Incorrect Password" })

    }
  createSession = (userEmail, userID) => {
    session.selectWhere("fk_user", userID, function (result) {
      if (result.length === 0) session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], (result) => { })
      else session.update(["session_id", "expires"], [sessionID, sessionExpires], userID, (result) => { })
      return res.json({ userEmail, userID });
    })
  };
  validateClientData((boolen) => {
    if (boolen) checkIfUserExsist(userEmail)
  })
});

router.route('/logout').delete((req, res) => {
  let userID = req.body.userID
  validateClientData = (cb) => {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else cb(true);
  };
  let deleteSession = () => {
    session.delete(userID, function (result) {
      return res.json(result);
    });
  };
  validateClientData((boolen) => {
    if (boolen) deleteSession()
  });
});

router.route("/register").post((req, res) => {
  let { userPassword, userEmail, userBirthday } = req.body, lowercaseEmail = userEmail.toLowerCase(), sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID;
  validateClientData = (cb) => {
    if (userEmail === undefined || userPassword === undefined || userBirthday === undefined) return res.status(400).json({ message: "Input must have userEmail, userPassword, and userBirthday" });
    else if (!validate.isEmail(userEmail)) return res.status(400).json({ message: "Email Isn't Correct" });
    else if (!validate.isDate(userBirthday)) return res.status(400).json({ message: "Incorrect Date For Birthday" });
    else if (!validate.isPassword(userPassword)) return res.status(400).json({ message: "Invalid Password Needs To Have 8 Characters" });
    else cb(true);
  };
  let checkIfUserExsist = (lowercaseEmail) => {
    user.selectWhere("userEmail", lowercaseEmail, function (result) {
      if (result.length === 0) return hashPassword(userPassword)
      else return res.status(400).json({ message: "Email Already Registered" });
    });
  },
    hashPassword = (userPassword) => {
      let salt = 12;
      bcrypt.hash(userPassword, salt).then((hashedPassword) => {
        return createUser(hashedPassword)
      });
    },
    createUser = (hashedPassword) => {
      user.create(["userPassword", "userEmail", "userBirthday"], [hashedPassword, lowercaseEmail, userBirthday], function (response) {
        userID = response.insertId
        createSession(userID, response)
      });
    },
    createSession = (userID, response) => {
      session.create(["fk_user", "session_id", "expires"], [userID, sessionID, sessionExpires], function (result) {
      })
      return res.json(response);
    }
  validateClientData((boolen) => {
    if (boolen) checkIfUserExsist(lowercaseEmail)
  });
});

router.route("/deleteTestUser").delete((req, res) => {
  let { userPassword, userEmail, userID } = req.body, sessionExpires = req.session.cookie._expires, sessionID = req.sessionID;
  async function validateClientData(cb) {
    if (userEmail === undefined || userPassword === undefined) return res.status(400).json({ message: "Data must include userPassword and userEmail" });
    else if (!validate.isString(userPassword)) return res.status(400).json({ message: "Password Isn't A String" });
    else if (!validate.isEmail(userEmail)) return res.status(400).json({ message: "Email Isn't Correct" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let checkIfUserExsist = () => {
    let lowercaseEmail = userEmail.toLowerCase();
    user.selectWhere("userEmail", lowercaseEmail, function (result) {
      if (result.length === 0) return res.status(400).json({ message: "Email Does Not Exist" });
      checkUserPassword(result)
    });
  },
    checkUserPassword = (result) => {
      let databasePassword = result[0].userPassword;
      if (bcrypt.compareSync(userPassword, databasePassword)) userID = result[0].id;
      else return res.status(400).json({ message: "Incorrect Password" });
      if (userID) deleteUser()
    }
  deleteUser = () => {
    user.deleteTestUser(["id"], [userID], function (deletedRow) {
      return res.json({ message: `Deleted User ${userEmail}` });
    });
  };
  validateClientData((boolen) => {
    if (boolen) checkIfUserExsist()
  });
});

router.route("/setup").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.body.userID), data = { gender, weight, height, metric } = req.body;
  async function validateClientData(cb) {
    if (!validate.isString(data.gender)) return res.status(400).json({ message: "Gender Isn't A String" });
    else if (!validate.isNumber(data.weight)) return res.status(400).json({ message: "Weight Isn't A Number" });
    else if (!validate.isNumber(data.height)) return res.status(400).json({ message: "Height Isn't A Number" });
    else if (!data.metric === 0 || !data.metric === 1 || data.metric == undefined) return res.status(400).json({ message: "Metric Should Be 0 Or 1" });
    else if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let updateUserInfo = () => {
    user.update(["gender", "weight", "height", "metric"], [data.gender, data.weight, data.height, data.metric], data.userID, function (result) {
      if (result.error) return res.status(400).json({ message: result.error });
      return res.json(result);
    });
  };
  validateClientData((boolen) => {
    if (boolen === true) updateUserInfo()
  });
});

router.route("/nutritionPlan").post((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.body.id);
  async function validateClientData(cb) {
    let noError = true
    if (req.body.nutritionPlanData === undefined || req.body.nutritionPlanData === null || typeof req.body.nutritionPlanData !== "object") return res.status(400).json({ message: "nutritionPlanData Needs To Have name, descripption, and exercise_amount" });
    else if (req.body.nutritionPlanNutrients === undefined || req.body.nutritionPlanNutrients === null || typeof req.body.nutritionPlanNutrients !== "object") return res.status(400).json({ message: "nutritionPlanNutrients Must Contain Nutrients With id and amount For Each" });
    else if (validate.isNumber(userID) === false) return res.status(400).json({ message: "userID Should Be A Number" });
    else if ((Object.values(req.body.nutritionPlanData)).every(validate.isString) === false) return res.status(400).json({ message: "Name, Description, And Exercise Amount Need To Be Strings" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    Object.values(req.body.nutritionPlanNutrients).forEach((nutrientObject, index) => {
      if (noError) {
        if (Object.values(nutrientObject).every(validate.isNumberString) === false) {
          noError = false
          if (index === Object.values(req.body.nutritionPlanNutrients).length - 1) return res.status(400).json({ message: "id And Amount Of Each Nutrient Must Be A Number" });
        }
        else if (index === Object.values(req.body.nutritionPlanNutrients).length - 1) return cb(noError)
      }
      else if (index === Object.values(req.body.nutritionPlanNutrients).length - 1) return res.status(400).json({ message: "id And Amount Of Each Nutrient Must Be A Number" });
    });
  };
  let createNutritionPlan = () => {
    let nutritionPlanData = { name, description, exercise_amount } = req.body.nutritionPlanData;
    nutritionPlan.create(["fk_user", ...Object.keys(nutritionPlanData)], [userID, ...Object.values(nutritionPlanData)], function (result) {
      if (result.error) return res.status(400).json({ message: result.error });
      createNutritionPlanNutrients(result.insertId)
    });
  },
    createNutritionPlanNutrients = (nutritionPlanId) => {
      let nutritionPlanNutrients = req.body.nutritionPlanNutrients;
      nutritionPlan.createNutrients(nutritionPlanNutrients, nutritionPlanId, function (result) {
        if (result.error) return res.status(400).json({ message: result.error });
        updateUserActiveNutritionPlanFK(nutritionPlanId)
      });
    },
    updateUserActiveNutritionPlanFK = (nutritionPlanId) => {
      user.update(["fk_active_nutrition_plan"], [nutritionPlanId], userID, function (result) {
        if (result.error) return res.status(400).json({ message: result.error });
        return res.json({ message: "new nutrition plan created", nutritionPlanId });
      });

    };
  validateClientData((boolen) => {
    if (boolen === true) createNutritionPlan()
  });
});

router.route("/nutritionPlan/:planID/:userID").delete((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, planID } = req.params;
  userID = parseInt(userID), planID = parseInt(planID)
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isNumber(planID)) return res.status(400).json({ message: "planID Should Be A Number" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let deleteUserNutritionPlan = () => {
    nutritionPlan.delete(planID, userID, (result2) => {
      if (result2.error) return res.status(400).json({ meesage: result2.error })
      else if (result2.affectedRows === 0) return res.status(400).json({ message: "No nutrition plan to delete" });
      else return res.json(result2);
    });
  };

  validateClientData((boolen) => {
    if (boolen === true) deleteUserNutritionPlan()
  });
});

router.route("/measurements/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = parseInt(req.params.userID);
  async function validateClientData(cb) {
    if (!validate.isNumber(userID)) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let selectUserMeasurements = () => {
    user.selectWhere("id", userID, function (result) {
      let data = {
        gender: result[0].gender,
        weight: result[0].weight,
        height: result[0].height,
        metric: result[0].metric,
        userBirthday: result[0].userBirthday,
      };
      return res.json(data);
    });
  };
  validateClientData((boolen) => {
    if (boolen === true) selectUserMeasurements()
  });
});

router.route("/nutritionPlan/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = req.params.userID;
  async function validateClientData(cb) {
    if (!validate.isNumber(parseInt(userID))) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true)
  };
  let getUserActiveNutritionPlanFK = () => {
    user.selectWhere("id", userID, function (result) {
      if (result[0].fk_active_nutrition_plan) selectActiveNutritionPlan(result[0].fk_active_nutrition_plan)
      else return res.status(400).json({ message: "User Has No Active Nutrition Plan" });
    });
  },
    selectActiveNutritionPlan = (fk) => {
      let data = { nutritionPlan: {}, nutritionPlanData: [] }
      nutritionPlan.selectWhere("id", fk, function (result) {
        data.nutritionPlan = result[0]
        data.nutritionPlan.description = data.nutritionPlan.description.toString();
        selectActiveNutritionPlanNutrients(data)
      })
    },
    selectActiveNutritionPlanNutrients = (data) => {
      user.selectActiveNutritionPlanNutrients(userID, function (result) {
        data.nutritionPlanData = [...result];
        return res.json(data)
      });
    };


  validateClientData((boolen) => {

    if (boolen === true) getUserActiveNutritionPlanFK()

  });
});

router.route("/personalInfo/:userID").get((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, userID = req.params.userID;
  async function validateClientData(cb) {
    if (!validate.isNumber(parseInt(userID))) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let selectUserPersonalInfo = () => {
    user.selectWhere("id", userID, function (result2) {
      let data = {
        userBirthday: result2[0].userBirthday,
        userEmail: result2[0].userEmail
      }
      return res.json(data);
    });
  };

  validateClientData((boolen) => {
    if (boolen === true) selectUserPersonalInfo()
  });
});

router.route("/personalInfo").put((req, res) => {
  let sessionExpires = req.session.cookie._expires, sessionID = req.sessionID, { userID, userEmail, userBirthday } = req.body
  async function validateClientData(cb) {
    if (userID == null || userEmail == null || userBirthday == null) return res.status(400).json({ message: "Data must contain userID, userEmail, and userBirthday" });
    else if (!validate.isNumber(parseInt(userID))) return res.status(400).json({ message: "userID Should Be A Number" });
    else if (!validate.isEmail(userEmail)) return res.status(400).json({ message: "Email Isn't Correct" });
    else if (!validate.isDate(userBirthday)) return res.status(400).json({ message: "Incorrect Date For Birthday" });
    else if (await validate.isSessionExpired(sessionID, sessionExpires, userID)) return res.status(400).json({ message: "Your session has expired." })
    else cb(true);
  };
  let updateUserPersonalInfo = () => {
    user.update(["userEmail", "userBirthday"], [userEmail, userBirthday], userID, function (result2) {
      return res.json(result2)
    });
  };
  validateClientData((boolen) => {
    if (boolen === true) updateUserPersonalInfo()
  });
});

module.exports = router;
