var express = require("express");
var router = express.Router();
var session = require("../../models/session");
var nutritionPlan = require("../../models/nutritionPlan");
const check = require("../../utils/check");
const food = require("../../models/food");


router.route("/dailySum/:userID/:date").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  // console.log("here")

  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], req.params.userID, function (result) {

    if (result.error) {

      res.json(result)
    }

    else {
      nutritionPlan.selectDailySum(req.params.userID, req.params.date, (result2) => {
        // console.log(result2);
        res.json(result2)
      });
    }
  });


});

router.route("/averageMacros/:userID/:dateFrom/:dateTill").get((req, res) => {
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  const { userID, dateFrom, dateTill } = req.params;

  if(!check.isNumber(userID)){
    res.json({error: "User ID Isn't A Number!"});
  }
  else if(!check.isDate(dateFrom) && !check.isDate(dateTill)){
    res.json({error: "Dates Aren't Dates"});
  }
  
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result)
    }

    else {


        nutritionPlan.selectAverageMacros(userID, dateFrom, dateTill, (result2) => {
          // console.log(result2);
          res.json(result2)
        });
   
 
    }
  });


});

router.route("/userNutrientsTimeline/:userID/:dateFrom/:dateTill").get((req, res)=>{
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  const { userID, dateFrom, dateTill } = req.params;

  if(!check.isNumber(userID)){
    res.json({error: "User ID Isn't A Number!"});
  }
  else if(!check.isDate(dateFrom) && !check.isDate(dateTill)){
    res.json({error: "Dates Aren't Dates"});
  }
  
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result)
    }

    else {


        nutritionPlan.userNutrientsTimeline(userID, dateFrom, dateTill, (result2) => {
          // console.log(result2);
          res.json(result2)
        });
   
 
    }
  });


});


router.route("/userFoodLogs/:userID/:dateFrom/:dateTill/:limit/:offset").get((req, res)=>{
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;
  const { userID, dateFrom, dateTill, limit, offset } = req.params;

  if(!check.isNumber(userID)){
    res.json({error: "User ID Isn't A Number!"});
  }
  else if(!check.isDate(dateFrom) && !check.isDate(dateTill)){
    res.json({error: "Dates Aren't Dates"});
  }
  
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], userID, function (result) {

    if (result.error) {

      res.json(result)
    }

    else {


        food.userFoodLogs(userID, dateFrom, dateTill, limit, offset, (result2) => {
          // console.log(result2);
          res.json(result2)
        });
   
 
    }
  });


});


router.route("/deleteUserLogs").delete((req, res)=>{
  // console.log(req.body)
  const { id } = req.body;
  let sessionExpires = req.session.cookie._expires;
  let sessionID = req.sessionID;

  if(!check.isNumber(id)){
    res.json({error: "User ID Isn't A Number!"});
  }
  
  session.checkSession(["session_id", "expires"], [sessionID, sessionExpires], id, function (result) {

    if (result.error) {

      res.json(result)
    }

    else {


        food.deleteUserLogs( req.body, (result2) => {
          // console.log(result2);
          res.json(result2)
        });
   
 
    }
  });


});



// router.route("/logs/average/:id/:table/:date1/:date2").get((req,res) =>{
//     nutrient.selectAverage(req.params.id, req.params.table, req.params.date1, req.params.date2, function(result){
//         console.log(result)
//         res.json(result)
//     })

// })
module.exports = router;