var express = require("express");
var router = express.Router();
var session = require("../../models/session");
var nutritionPlan = require("../../models/nutritionPlan");


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

// router.route("/logs/average/:id/:table/:date1/:date2").get((req,res) =>{
//     nutrient.selectAverage(req.params.id, req.params.table, req.params.date1, req.params.date2, function(result){
//         console.log(result)
//         res.json(result)
//     })

// })
module.exports = router;