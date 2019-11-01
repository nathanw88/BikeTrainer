const express = require("express");
const router = express.Router();
const axios = require("axios");
const running = require("../../models/running");
const biking = require("../../models/biking");
const sleeping = require("../../models/sleeping");
const food = require("../../models/food");
const nutrient = require("../../models/nutrient");
require('dotenv').config();
const fs = require('fs')

 
router.route("/bike").post((req, res) => {

  biking.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/run").post((req, res) => {
  running.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/sleep").post((req, res) => {
  sleeping.create(req.body.keys, req.body.values, function (data) {
    res.json(data)
  });
});

router.route("/food").post((req, res) => {
  // let tableValues = Object.values(tables);
  // let sql = ""
  // for (let i = 0; i < tableValues.length; i++) {
  //   sql += `CREATE TABLE ${tableValues[i]} (
  //     fk_user INT(11) NOT NULL,
  //       fk_food INT(11) NOT NULL,
  //     id INT(11) NOT NULL AUTO_INCREMENT,
  //     value INT(11),
  //       nutrient_id INT(11),
  //       date DATE,
  //       time TIME(6),
  //       grouping VARCHAR(255),
  //       name VARCHAR(255),
  //       unit VARCHAR(11),
        
  //     FOREIGN KEY (fk_user) REFERENCES users (id),
  //       FOREIGN KEY (fk_food) REFERENCES food (id),
  //       PRIMARY KEY (id)
  //       );`

  // }

  // fs.writeFile('sql.txt', sql, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
  // fs.readFile('./mesurements.json', 'utf8', (err, jsonString) => {
  //   if (err) {
  //     console.log("Error reading file from disk:", err)
  //     return
  //   }
  //   try {
  //     const mesurements = JSON.parse(jsonString)
  //     const arrays = Object.entries(mesurements)
  //     // console.log(Object.entries(mesurements))
  //     console.log(mesurements)
  //     for(let i = 0; i < arrays.length; i++){
  //       const mesu = Object.entries(arrays[i][1])
  //       // console.log(arrays[i][0])
  //       // console.log(mesu)
  //       for(let j = 0; j < mesu.length; j++){
  //         // console.log(`#${arrays[i][0]}`)
  //         // console.log(mesu[j][0])
  //         // console.log(mesu[j][1])
  //         if(mesu[j][1] > 0){
  //           console.log(`#${arrays[i][0]}`)
  //           console.log(mesu[j][0])
  //           mesurements[arrays[i][0]] = mesu[j][0]
  //         }
  //       }

  //     }
  //     // for (let i = 0; i < req.body.array.length; i++) {
  //     //   let nutrient = req.body.array[i]
  //     //   console.log(nutrient)
  //     //   // console.log(req.body.array[i])
  //     //   mesurements[nutrient.nutrient_id][nutrient.unit]++
  //     // }
  //     const jsonMes = JSON.stringify(mesurements)
  //     fs.writeFile('./mesurements.json', jsonMes, err => {
  //       if (err) {
  //         console.log('Error writing file', err)
  //       } else {
  //         console.log('Successfully wrote file')
  //         res.json(mesurements)
  //       }
  //     })
  //   } catch (err) {
  //     console.log('Error parsing JSON string:', err)
  //   }
  // })

  food.create(req.body.foodName, function (response) {
    let fk_food = response.insertId;
    nutrient.createMultiTables(req.body.array, fk_food, function (data) {
      res.json(data)

    })
  })



});

// function getNutrients(ndbno, cb) {
//   axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=${apiKey}`).then(function (response) {
//     console.log(response)
//     cb(response)
//   })
// }




module.exports = router;