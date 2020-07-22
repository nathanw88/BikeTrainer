// Import MySQL connection.
var mysqlPool = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

var orm = {

  //select everything from the MySQL database
  all: function (table, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = "SELECT * FROM " + table + ";";
      connection.query(queryString, function (error, result) {
        if (error) throw error;
        cb(result);
      });
      connection.release();
    });
  },

  //table inserts
  create: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
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
      connection.release();
    });
  },

  update: function (table, condition, cols, vals, userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
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
      connection.release();
    });
  },

  findFood: function (searchString, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = `SELECT * FROM food WHERE MATCH(description, gtin, name, brand, additional_description) AGAINST(?) LIMIT 25;`

      connection.query(queryString, [searchString], function (err, result) {
        //result from  food table where searchString was found
        if (err) throw err;
        cb(result)

      });
      connection.release();
    });
  },

  //delete from table function
  delete: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = "DELETE FROM ?? WHERE "

      if (cols.length != vals.length && cols.length <= 0) {
        err = "Error: BAD_INPUTS_ERROR: ";

        if (cols.length <= 0) err += "Number of Columns is 0";
        else if (vals.length <= 0) err += "Number of Values is 0";
        else err += "Number of Columns does not match number of Values";
        throw err;
      }
      else {
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
      connection.release();
    });
  },

  deleteNutritionPlan: function (planID, userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let queryString = `UPDATE users SET fk_active_nutrition_plan = NULL WHERE id = ?;`
      connection.query(queryString, [userID], function (err, result) {
        if (err) throw err;

        let queryString2 = `DELETE FROM nutrition_plan_nutrients WHERE fk_nutrition_plan = ?;`
        connection.query(queryString2, [planID], function (err, result) {
          if (err) throw err
          
          let queryString3 = `DELETE FROM nutrition_plan WHERE id = ? AND fk_user = ?;`
          connection.query(queryString3, [planID, userID], function(err, result){
            cb(result);
          })
        })
      })
      connection.release();
    })

  },

  selectWhereMulti: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = "SELECT * FROM ?? WHERE ";

      if (cols.length != vals.length && cols.length <= 0) {
        err = "Error: BAD_INPUTS_ERROR: ";

        if (cols.length <= 0) err += "Number of Columns is 0";
        else if (vals.length <= 0) err += "Number of Values is 0";
        else err += "Number of Columns does not match number of Values";

        throw err;
      }
      else {
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
      connection.release();
    })
  },

  postingFood: function (data, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var resArray = [];
      data.grams.map((item, i) => {
        let arrayObjects = {
          fk_user: data.fk_user,
          fk_food: data.fk_food[i],
          grams: item,
          date: data.date[i].toString(),
        };

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
      connection.release();
    });
  },

  selectWhere: function (table, searchCol, val, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
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
      connection.release();
    });
  },

  // Left Join Function
  leftJoin: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? IS NOT NULL;"

      connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2], function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },

  //left Join Function Where table2.key is value
  leftJoinWhere: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, val, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? = ?;"

      connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2, val], function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },

  // selectLogs: function (FK, table, cb) {
  //   mysqlPool.getConnection(function (err, connection) {
  //     if (err) {
  //       connection.release();
  //       console.log(' Error getting mysqlPool connection: ' + err);
  //       throw err;
  //     }
  //     var queryString = "SELECT * FROM ?? WHERE ??.fk_user = ? ORDER BY date"

  //     connection.query(queryString, [table, table, FK], function (err, result) {
  //       if (err) throw err;
  //       cb(result)
  //     })
  //     connection.release();
  //   });
  // },

  postNutritionPlanNutrients: (obj, fkNutritionPlan, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
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
      connection.release();
    });
  },

  selectDailySum: (userID, date, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let dataArray = [];
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      let val = [userID]

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        let maxLength = result.length;

        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = result[i]
          let maxDate = new Date()
          let minDate = new Date(date);
          maxDate.setDate(minDate.getDate() + 1);
          let queryString2 = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date`
          let vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]

          connection.query(queryString2, vals, (err, result2) => {
            if (err) throw err;
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
              // console.log(dataArray)
              cb(dataArray)
            };
          })
        }
      })
      connection.release();
    });
  },

  selectAverageMacros: (userID, dateFrom, dateTill, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let dataArray = [];
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      let val = [userID]

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        let maxLength = result.length;

        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = result[i]
          let maxDate = new Date(dateTill)
          maxDate.setDate(maxDate.getDate() + 1);
          let minDate = new Date(dateFrom);
          let queryString2 = `SELECT AVG(dailySum) as dailyAverage, date FROM (SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date) as average`
          let vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]

          connection.query(queryString2, vals, (err, result2) => {
            if (err) throw err;
            let resultArray = [];
            let maxLength2 = result2.length;

            for (let i = 0; i < maxLength2; i++) {

              resultArray.push({
                dailyAverage: result2[i].dailyAverage,
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
              cb(dataArray)
            };
          })
        }
      })
      connection.release();
    });
  },

  userFoodLogs: (userId, dateFrom, dateTill, limit, offset, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let maxDate = new Date(dateTill)
      maxDate.setDate(maxDate.getDate() + 1);
      let minDate = new Date(dateFrom);
      let val = [userId, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10), parseInt(offset), parseInt(limit)]
      let queryString = `SELECT user_food.fk_food, user_food.grams, user_food.date, food.description, food.brand FROM user_food INNER JOIN food ON user_food.fk_food = food.id WHERE user_food.fk_user = ? AND date >= ? AND date < ? ORDER BY user_food.date LIMIT ?, ?;`

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        // console.log(result);
        cb(result);
      })
      connection.release();
    });
  },

  userNutrientsTimeline: (userID, dateFrom, dateTill, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let dataArray = [];
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      let val = [userID]

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        let maxLength = result.length;

        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = result[i]
          let maxDate = new Date(dateTill)
          maxDate.setDate(maxDate.getDate() + 1);
          let minDate = new Date(dateFrom);
          let queryString2 = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date`
          let vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)];



          connection.query(queryString2, vals, (err, result2) => {
            if (err) throw err;

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
              cb(dataArray)
            };
          })
        }
      })
      connection.release();
    });
  },

  deleteUserLogs: function (data, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let gramsDivided = parseFloat(data.grams) / 100;
      var queryString = "SELECT fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";

      connection.query(queryString, [gramsDivided, data.fk_food], function (err, result) {
        // console.log(result)
        if (err) throw err;

        let queryString2 = `DELETE FROM user_nutrient WHERE fk_user = ? and fk_nutrient = ? and value = ?  and DATE(date_time) = ? LIMIT 1;  `

        for (let i = 0; i < result.length; i++) {
          let date
          let vals = []
          let dataObject = {
            fk_user: data.id,
            fk_nutrient: result[i].fk_nutrient,
            value: parseFloat(result[i].value.toFixed(3)),
            date: new Date(new Date(data.date).getTime() - new Date(data.date).getTimezoneOffset() * 60000).toISOString().substr(0, 10)
          }

          vals.push(dataObject.fk_user);
          vals.push(dataObject.fk_nutrient);
          vals.push(parseFloat(dataObject.value).toFixed(3));
          vals.push(dataObject.date);
          console.log(vals);

          connection.query(queryString2, vals, function (err, response) {
            if (err) throw err;
          })

          if (i === result.length - 1) {
            let queryString3 = `DELETE FROM user_food WHERE fk_user = ? and DATE(date) = ? and fk_food = ? and grams = ? LIMIT 1;`

            connection.query(queryString3, [data.id, dataObject.date, data.fk_food, data.grams], function (err, response3) {

            })

          }
        }
      })



      cb("done");
      connection.release();
    });

  },

  selectActiveNutritionPlan: function (userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysqlPool connection: ' + err);
        throw err;
      }
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      let val = [userID];

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        cb(result);
      })
      connection.release();
    });
  }

};

module.exports = orm;