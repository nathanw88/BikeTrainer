var mysqlPool = require("../config/connection.js");

function printSingleQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function printDoubleQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("??");
  }
  return arr.toString();
}

function handleMysqlConnectionError(err, connection) {
  connection.release();
  throw (err);
}


var orm = {

  create: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection);
      var queryString = `INSERT INTO  ${table} (${cols.toString()}) VALUES (${printSingleQuestionMarks(vals.length)});`;
      connection.query(queryString, vals, function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },

  update: function (table, condition, cols, vals, conditionMatch, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      var queryString = `UPDATE ${table} SET `;
      cols.map((item, i) => {
        if (i < cols.length - 1) queryString += `${item} = ?,`;
        else {
          queryString += `${item} = ? WHERE ${condition} = ?;`;
          connection.query(queryString, [...vals, conditionMatch], function (err, result) {
            if (err) throw err;
            cb(result);
          });
        };
      });
      connection.release();
    });
  },

  delete: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection);
      var queryString = `DELETE FROM ?? WHERE `;
      let columnsValues = [];
      for (var i = 0; i < cols.length; i++) {
        columnsValues[i] = { [cols[i]]: vals[i] }
        if (i === 0) queryString += "?";
        else queryString += " AND ?";
      }
      queryString += ";";
      connection.query(queryString, [table, ...columnsValues], function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },

  selectWhere: function (table, searchCol, val, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      if (searchCol.length <= 0) throw ({ error: "Number of Columns is 0" });
      var queryString = "SELECT * FROM ?? WHERE ?? = ?;";
      connection.query(queryString, [table, searchCol, val], function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },

  findFood: function (searchString, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection);
      var queryString = `SELECT * FROM food WHERE MATCH(description, gtin, name, brand, additional_description) AGAINST(?) LIMIT 25;`;
      connection.query(queryString, [searchString], function (err, result) {
        if (err) throw err;
        cb(result);
      });
      connection.release();
    });
  },


  deleteNutritionPlan: function (planID, userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)

      const updateUserFKActiveNutritionPlanToNull = (planID, userID) => {
        let queryString = `UPDATE users SET fk_active_nutrition_plan = NULL WHERE id = ? AND fk_active_nutrition_plan = ? ;`
        connection.query(queryString, [userID, planID], function (err, result) {
          if (err) throw err;
          if (result.affectedRows === 0) return cb(result)
          return deleteUserNutritionPlanNutrients(planID);
        });
      },
        deleteUserNutritionPlanNutrients = (planID) => {
          let queryString2 = `DELETE FROM nutrition_plan_nutrients WHERE fk_nutrition_plan = ?;`
          connection.query(queryString2, [planID], function (err, result) {
            if (err) throw err;
            return deleteUserNutritionPlan(planID, userID)
          })
        },
        deleteUserNutritionPlan = (planID, userID) => {
          let queryString3 = `DELETE FROM nutrition_plan WHERE id = ? AND fk_user = ?;`
          connection.query(queryString3, [planID, userID], function (err, result) {
            if (err) throw err;
            cb(result);
          })
        }
      updateUserFKActiveNutritionPlanToNull(planID, userID)
      connection.release();
    })

  },


  postingFood: function (data, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let resultArray = [],
        itterateThroughData = (data) => {
          data.grams.map((item, i) => {
            let foodObject = {
              fk_user: data.fk_user,
              fk_food: data.fk_food[i],
              grams: item,
              date: data.date[i].toString(),
            };
            return insertIntoUserFood(foodObject)
          });
        },
        insertIntoUserFood = (foodObject) => {
          var queryString = `INSERT INTO user_food (${printDoubleQuestionMarks(Object.keys(foodObject).length)}) VALUES (${printSingleQuestionMarks(Object.values(foodObject).length)});`
          connection.query(queryString, [...Object.keys(foodObject), ...Object.values(foodObject)], function (err, result) {
            if (err) throw (err);
            resultArray.push(result);
            return selectFoodNutrient(foodObject);
          })
        },
        selectFoodNutrient = (foodObject) => {
          let conversionToAmountEaten = parseFloat(foodObject.grams) / 100,
            queryString = "SELECT fk_food, fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";
          connection.query(queryString, [conversionToAmountEaten, foodObject.fk_food], function (err, result) {
            if (err) throw (err);
            return insertIntoUserNutrient(result, foodObject)
          })
        },
        insertIntoUserNutrient = (result, foodObject) => {
          let values = [],
            queryString3 = `INSERT INTO user_nutrient (fk_user, fk_nutrient, value, date_time) VALUES ? `
          for (let i = 0; i < result.length; i++) {
            values.push([foodObject.fk_user, result[i].fk_nutrient, result[i].value, foodObject.date.toString()]);
            connection.query(queryString3, [values], function (err, response) {
              if (err) throw (err);
            })
          }
          return
        };
      itterateThroughData(data)
      connection.release();
      return cb(resultArray);
    });
  },


  postNutritionPlanNutrients: function (obj, fkNutritionPlan, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let queryString2 = "INSERT INTO nutrition_plan_nutrients (fk_nutrition_plan, fk_nutrient, amount) VALUES ?",
        keysArray = Object.keys(obj), vals = [], i, maxLength = keysArray.length;
      for (i = 0; i < maxLength; i++) {
        vals.push([fkNutritionPlan, obj[keysArray[i]].id, obj[keysArray[i]].amount])
      }
      connection.query(queryString2, [vals], function (err, response) {
        if (err) throw err;
        return cb(response)
      })
      connection.release();
    });
  },

  selectDailySum: function (userID, date, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)

      let selectDailySumFromArrayOfNutrientsFromNutritionPlan = (nutrientArray) => {
        if (nutrientArray.error) cb(nutrientArray)
        let maxLength = nutrientArray.length, resultArray = [];
        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = nutrientArray[i], maxDate = new Date(date), minDate = new Date(date);
          maxDate.setDate(minDate.getDate() + 1);
          let queryString = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date;`,
            vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]
          connection.query(queryString, vals, (err, result2) => {
            if (err) throw err;
            let logArray = [], maxLength2 = result2.length, j;
            for (j = 0; j < maxLength2; j++) {
              logArray.push({
                dailySum: result2[j].dailySum,
                date: new Date(result2[j].date)
              });
            }
            let data = {
              amount: amount,
              maxAmount: max_amount,
              name: name,
              unit: unit,
              log: [...logArray]
            }
            resultArray.push(data)
            if (i === maxLength - 1) return cb(resultArray)
          });
        }
      }
      orm.selectActiveNutritionPlanNutrients(userID, selectDailySumFromArrayOfNutrientsFromNutritionPlan)
      connection.release();
    });
  },

  selectAverageNutrients: function (userID, dateFrom, dateTill, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)

      let selectAverageFromArrayOfNutrientsFromNutritionPlan = (nutrientArray) => {
        if (nutrientArray.error) cb(nutrientArray)
        let maxLength = nutrientArray.length, resultArray = [];
        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = nutrientArray[i], maxDate = new Date(dateTill), minDate = new Date(dateFrom);
          let queryString = `SELECT AVG(dailySum) as dailyAverage, date FROM (SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date) as average`,
            vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]
          connection.query(queryString, vals, (err, result2) => {
            if (err) throw err;
            let logArray = [], maxLength2 = result2.length, j;
            for (j = 0; j < maxLength2; j++) {
              logArray.push({
                dailyAverage: result2[j].dailyAverage,
                date: new Date(result2[j].date)
              });
            }
            let data = {
              amount: amount,
              maxAmount: max_amount,
              name: name,
              unit: unit,
              log: [...logArray]
            }
            resultArray.push(data)
            if (i === maxLength - 1) return cb(resultArray)
          });
        }
      }
      orm.selectActiveNutritionPlanNutrients(userID, selectAverageFromArrayOfNutrientsFromNutritionPlan)
      connection.release();
    });
  },

  userFoodLogs: function (userId, dateFrom, dateTill, limit, offset, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let maxDate = new Date(dateTill), minDate = new Date(dateFrom)
      maxDate.setDate(maxDate.getDate() + 1);
      let val = [userId, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10), parseInt(offset), parseInt(limit)],
        queryString = `SELECT user_food.fk_food, user_food.grams, user_food.date, food.description, food.brand FROM user_food 
        INNER JOIN food ON user_food.fk_food = food.id WHERE user_food.fk_user = ? AND date >= ? AND date < ? ORDER BY user_food.date LIMIT ?, ?;`
      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        cb(result);
      })
      connection.release();
    });
  },

  userNutrientsTimeline: function (userID, dateFrom, dateTill, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let selectTimelineOfNutrientsFromNutritionPlan = (nutrientArray) => {
        if (nutrientArray.error) cb(nutrientArray)
        let maxLength = nutrientArray.length, resultArray = [];
        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = nutrientArray[i], maxDate = new Date(dateTill), minDate = new Date(dateFrom);
          maxDate.setDate(maxDate.getDate() + 1);
          let queryString = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date`,
            vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]
          connection.query(queryString, vals, (err, result2) => {
            if (err) throw err;
            let logArray = [], maxLength2 = result2.length, j;
            for (j = 0; j < maxLength2; j++) {
              logArray.push({
                dailySum: result2[j].dailySum,
                date: new Date(result2[j].date)
              });
            }
            let data = {
              amount: amount,
              maxAmount: max_amount,
              name: name,
              unit: unit,
              log: [...logArray]
            }
            resultArray.push(data)
            if (i === maxLength - 1) return cb(resultArray)
          });
        }
      }
      orm.selectActiveNutritionPlanNutrients(userID, selectTimelineOfNutrientsFromNutritionPlan)
      connection.release();
    })

  },

  deleteUserLogs: function (data, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)

      let selectNutrientsInFoodLogToBeDeleted = (grams, fkFood) => {
        let conversionToAmountEaten = parseFloat(grams) / 100;
        var queryString = "SELECT fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";

        connection.query(queryString, [conversionToAmountEaten, fkFood], function (err, result) {
          if (err) throw err;
          deleteNutrientLogs(result)
        })
      },
        deleteNutrientLogs = (result) => {

          let queryString2 = `DELETE FROM user_nutrient WHERE fk_user = ? and fk_nutrient = ? and value = ?  and DATE(date_time) = ? LIMIT 1;  `

          for (let i = 0; i < result.length; i++) {
            let vals = []
            let dataObject = {
              fk_user: data.userID,
              fk_nutrient: result[i].fk_nutrient,
              value: parseFloat(result[i].value.toFixed(3)),
              date: new Date(new Date(data.date).getTime() - new Date(data.date).getTimezoneOffset() * 60000).toISOString().substr(0, 10)
            }

            vals.push(dataObject.fk_user);
            vals.push(dataObject.fk_nutrient);
            vals.push(parseFloat(dataObject.value).toFixed(3));
            vals.push(dataObject.date);

            connection.query(queryString2, vals, function (err, response) {
              if (err) throw err;
            })
            if (i === result.length - 1) return deleteFoodLog(dataObject.date)
          }
        },
        deleteFoodLog = (date) => {

          let queryString3 = `DELETE FROM user_food WHERE fk_user = ? and DATE(date) = ? and fk_food = ? and grams = ? LIMIT 1;`

          connection.query(queryString3, [data.id, date, data.fk_food, data.grams], function (err, response3) {
            if (err) throw err;
            cb("done");
          })

        };
      selectNutrientsInFoodLogToBeDeleted(data.grams, data.fk_food);
      connection.release();
    })


  },

  selectActiveNutritionPlanNutrients: function (userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      connection.query(queryString, [userID], (err, result) => {
        if (err) throw err;
        if (result.length === 0) cb({ error: "No Nutrition Plan" })
        cb(result);
      })
      connection.release();
    });
  }

};

module.exports = orm;