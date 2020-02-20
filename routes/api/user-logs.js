var express = require("express");
var router = express.Router();
var axios = require("axios");
 
// router.route("/logs/:id/:table").get((req, res) =>{
//     user.selectLogs(req.params.id, req.params.table, function(result){
        
//         res.json(result)
//     })
// })
// router.route("/logs/average/:id/:table/:date1/:date2").get((req,res) =>{
//     nutrient.selectAverage(req.params.id, req.params.table, req.params.date1, req.params.date2, function(result){
//         console.log(result)
//         res.json(result)
//     })
    
// })
// router.route("/logs/sums/:id/:table/:date1/:date2").get((req,res) =>{
//     nutrient.selectDailySums(req.params.id, req.params.table, req.params.date1, req.params.date2, function(result){
//         console.log(result)
//         res.json(result)
//     })
    
// })