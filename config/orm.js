// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
//vestigal may come in use later
// function objToSql(ob) {
//   var arr = [];

//   for (var key in ob) {
//     var value = ob[key];
//     // check to skip hidden properties
//     if (Object.hasOwnProperty.call(ob, key)) {
//       // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
//       if (typeof value === "string" && value.indexOf(" ") >= 0) {
//         value = "'" + value + "'";
//       }
//       // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
//       // e.g. {sleepy: true} => ["sleepy=true"]
//       arr.push(key + "=" + value);
//     }
//   }
//   return arr.toString();
// }

var orm = {
  //select everything from the MySQL database
  all: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (error, result) {
      if (error) throw error;
      cb(result);
    });
  },
  //table inserts
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ");";

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  update: function (table, condition, cols, vals, userID, cb) {
    var queryString = `UPDATE ${table} SET `
    cols.map((item, i) => {
      if (i < cols.length - 1) {
        queryString += `${item} = ?,`
      }
      else {
        queryString += `${item} = ? WHERE ${condition} = ?`
        connection.query(queryString, [...vals, userID], function (err, result) {
          if (err) throw err;
          cb(result);
        });
      }
    })




  },

  //   //insert multiple rows
  //   createMulti: function (table, array, fk, cb) {

  //     var vals = [];
  //     var queryString = "INSERT INTO " + table;
  //     queryString += " (";
  //     queryString += Object.keys(array[0]).toString();
  //     queryString += ",fk_food"
  //     queryString += `) VALUES ${array.map((nutrient)=>{
  //       vals.push(...Object.values(nutrient));
  //       vals.push(fk)
  //       return `(${printQuestionMarks((Object.values(nutrient).length) + 1)})`;
  //     })}`;

  //     queryString += ";";
  // //console.log(queryString)
  // //console.log(vals)

  //     connection.query(queryString, vals, function (err, result) {
  //       if (err) throw err;
  //       cb(result);
  //     });
  //   },
  findFood: function (searchString, cb) {

    var queryString = `SELECT * FROM food WHERE MATCH(description, gtin, name, brand, additional_description) AGAINST(?);`
    // console.log(queryString)
    // console.log(vals)
    console.log(searchString)
    connection.query(queryString, [searchString], function (err, result) {
      //result from  food table where searchString was found
      if (err) throw err;
      console.log(`result: ${result}`)
      cb(result)

    });
  },

  // createMultiTables: function (array, fk, cb) {
  //   res = [ ];
  //   array.map((nutrient)=>{
  //     var vals = [];
  //     vals.push(...Object.values(nutrient[1]));
  //     vals.push(fk);
  //     var queryString = "INSERT INTO `" + nutrient[0] +"`"; 
  //     queryString += " (";
  //     queryString += Object.keys(nutrient[1]).toString();
  //     queryString += ",fk_food"
  //     queryString += `) VALUES (${printQuestionMarks((Object.values(nutrient[1]).length) + 1)})`
  //     // console.log(queryString)
  //     // console.log(vals)

  //     connection.query(queryString, vals, function (err, result) {
  //       res.push(result);
  //       if (err) throw err;

  //      });
  //   })
  // cb(res)
  // },
  //delete from table function
  delete: function (table, cols, vals, cb) {
    var queryString = "DELETE FROM ?? WHERE "
    if (cols.length != vals.length && cols.length <= 0) {
      err = "Error: BAD_INPUTS_ERROR: ";
      if (cols.length <= 0) err += "Number of Columns is 0";
      else if (vals.length <= 0) err += "Number of Values is 0";
      else err += "Number of Columns does not match number of Values";
      throw err;
    } else {
      queryString += cols[0] + " = " + vals[0];
      for (var i = 1; i < cols.length; i++) {
        queryString += " AND " + cols[i] + " = " + vals[i];
      }
      queryString += ";";

      connection.query(queryString, [table], function (err, result) {
        if (err) throw err;
        cb(result);
      });
    }
  },

  selectWhereMulti: function (table, cols, vals, cb) {
    var queryString = "SELECT * FROM ?? WHERE ";
    if (cols.length != vals.length && cols.length <= 0) {
      err = "Error: BAD_INPUTS_ERROR: ";
      if (cols.length <= 0) err += "Number of Columns is 0";
      else if (vals.length <= 0) err += "Number of Values is 0";
      else err += "Number of Columns does not match number of Values";
      throw err;
    } else {
      queryString += cols[0] + " = " + vals[0];
      for (var i = 1; i < cols.length; i++) {
        queryString += " AND " + cols[i] + " = " + vals[i];
      }
      queryString += ";";


      connection.query(queryString, [table], function (err, result) {
        if (err) throw err;
        cb(result);
      });
    }
  },

  //Select daily sums from a date range.
  selectDailySums: function (table, id, date1, maxDate, cb) {
    var queryString = "SELECT SUM(value) as dailySum, date, name FROM ?? WHERE date BETWEEN ? and ? and fk_user = ? GROUP BY date ORDER BY date;";
    connection.query(queryString, [table, date1, maxDate, id], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  //Selecting the average from a date range.
  selectAverage: function (table, id, date1, date2, cb) {
    var queryString = "SELECT AVG(dailySum) as average, name FROM (SELECT SUM(value) as dailySum, date, name FROM ?? WHERE date BETWEEN ? and ? and fk_user = ? GROUP BY date ORDER BY date) as averaging;";
    connection.query(queryString, [table, date1, date2, id], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },


  postingFood: function (data, cb) {
    var resArray = [];
    data.grams.map((item, i) => {
      let arrayObjects = {
        fk_user: data.fk_user,
        fk_food: data.fk_food[i],
        grams: item,
        date: data.date.toString(),
      }
      console.log(arrayObjects)
      var queryString = `INSERT INTO user_food (${Object.keys(arrayObjects).toString()}) VALUES (${printQuestionMarks(Object.values(arrayObjects).length)} );`

      connection.query(queryString, Object.values(arrayObjects), function (err, res) {
        if (err) throw err;
        resArray.push(res);

        let gramsDivided = parseFloat(arrayObjects.grams) / 100;
        var queryString2 = "SELECT fk_food, fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";
        connection.query(queryString2, [gramsDivided, arrayObjects.fk_food], function (err, result) {
          if (err) throw err;
          resArray.push(result);
          let vals = []

          var queryString3 = `INSERT INTO user_nutrient (fk_user, fk_nutrient, value, date_time) VALUES `

          for (let i = 0; i < result.length; i++) {
            let dataObject = {
              fk_user: arrayObjects.fk_user,
              fk_nutrient: result[i].fk_nutrient,
              value: result[i].value,
              date: arrayObjects.date.toString(),


            }
            vals.push(dataObject.fk_user);
            vals.push(dataObject.fk_nutrient);
            vals.push(dataObject.value);
            vals.push(dataObject.date);


            if (i < result.length - 1) {
              queryString3 += `(${printQuestionMarks(Object.values(dataObject).length)}),`

            }
            if (i === result.length - 1) {
              queryString3 += `(${printQuestionMarks(Object.values(dataObject).length)});`

              connection.query(queryString3, vals, function (err, response) {
                if (err) throw err;
                resArray.push(response)
              })
            }
          }

        });
      });
    });
    cb(resArray);
  },

  // selectFoodNutrient: function (data, cb) {

  //     // gramsDivided grams eaten divided by 100 to muliply with amount of nutrients contained in 100 grams of food
  //     let gramsDivided = parseFloat(data.grams)/100
  //     var queryString = "SELECT fk_food, fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";
  //     connection.query(queryString, [gramsDivided, data.fk_food], function (err, result) {
  //       if (err) throw err;
  //       cb(result);
  //     });
  //   },

  //Select everything from a variable table where search is val
  selectWhere: function (table, searchCol, val, cb) {
    if (searchCol.length <= 0) {
      err = "Number of Columns is 0";
      throw err
    }
    else {
      var queryString = "SELECT * FROM ?? WHERE ?? = ?;";
      connection.query(queryString, [table, searchCol, val], function (err, result) {
        if (err) throw err;
        cb(result);
      });
    }
  },


  // Left Join Function
  leftJoin: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, cb) {
    var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? IS NOT NULL;"
    connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  //left Join Function Where table2.key is value
  leftJoinWhere: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, val, cb) {
    var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? = ?;"
    connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2, val], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  selectLogs: function (FK, table, cb) {

    var queryString = "SELECT * FROM ?? WHERE ??.fk_user = ? ORDER BY date"

    connection.query(queryString, [table, table, FK], function (err, result) {
      if (err) throw err;

      cb(result)
    })
  },

  postNutritionPlanNutrients: (obj, fkNutritionPlan, cb) => {
    const keysArray = Object.keys(obj);
    let vals = [];
    let queryString2 = "INSERT INTO nutrition_plan_nutrients (fk_nutrition_plan, fk_nutrient, amount) VALUES "
    let i;
    let maxLength = keysArray.length;

    for (i = 0; i < maxLength; i++) {
      vals.push(
        fkNutritionPlan,
        obj[keysArray[i]].id,
        obj[keysArray[i]].amount
      )
      // console.log(vals)

      if (i < maxLength - 1) {
        queryString2 += `(?,?,?),`

      }
      else if (i === maxLength - 1) {
        queryString2 += `(?,?,?);`


      }
    }
    connection.query(queryString2, vals, function (err, response) {
      if (err) throw err;
      cb(response)
    })

  },

  selectActivePlan: (userID, date, cb) => {
    let dataArray = [];
    let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ${userID};`;

    connection.query(queryString, (err, result) => {
      if (err) throw err;
      let maxLength = result.length;
      for (let i = 0; i < maxLength; i++) {
        let { amount, max_amount, name, unit, id } = result[i]
        let maxDate = new Date()
        let minDate = new Date(date);
        maxDate.setDate(minDate.getDate() + 1);
        let queryString2 = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ${id} AND fk_user = ${userID} AND date_time >= "${minDate.toISOString().substring(0, 10)}" AND date_time < "${maxDate.toISOString().substring(0, 10)}" GROUP BY date ORDER BY date`

        connection.query(queryString2, (err, result2) => {
          if (err) throw err;
          console.log(result2)
          let resultArray = [];
          let maxLength2 = result2.length;
          for (let i = 0; i < maxLength2; i++) {

            resultArray.push({
              dailySum: result2[i].dailySum,
              date: new Date(result2[i].date)
            });

          };

          dataArray.push({
            amount,
            max_amount,
            name,
            unit,
            log: [...resultArray]
          });

          if (i === (maxLength - 1)) {
            console.log(dataArray)
            cb(dataArray)
          };
        })
      }



    })


  }

  // Nutrients : function () {

  //   var queryString = `SELECT * FROM food_nutrient WHERE fk_nutrient = 1085;`
  //   console.log(queryString)
  //   connection.query(queryString, function(err, result){
  //     // console.log(result);
  //     let lastIndexOfArray = result.length -1;
  //     for (let i = 0; i <= lastIndexOfArray; i++){

  //        queryString = `SELECT * FROM food_nutrient WHERE fk_food = ${result[i].fk_food} AND fk_nutrient = 1004;`

  //        connection.query(queryString, function(err, data){
  //       //   if(data == false){
  //       //     // console.log(result[i])
  //       //     let queryString2 = "UPDATE `nutrient` SET `use` = 0 WHERE `id` = " + result[i].id + ";"
  //       //     console.log(queryString2);
  //       //     connection.query(queryString2, function(err, res){
  //       //       console.log(err)
  //       //       console.log(res)
  //       //     } )
  //           console.log(result[i]);
  //           console.log(data);
  //       //   }
  //         })

  //      }
  //   })

  // }




};

module.exports = orm;