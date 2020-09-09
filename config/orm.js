var mysqlPool = require("../config/connection.js"), createError = require('http-errors');

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function handleMysqlConnectionError(err, connection) {
  connection.release();
  throw createError(503, err);
}


var orm = {

  create: function (table, cols, vals, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection);
      var queryString = `INSERT INTO  ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
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
          if (err) throw createError(400, err);
          if (result.affectedRows === 0) return cb(result)
          return deleteUserNutritionPlanNutrients(planID);
        });
      },
      deleteUserNutritionPlanNutrients = (planID)=>{
        let queryString2 = `DELETE FROM nutrition_plan_nutrients WHERE fk_nutrition_plan = ?;`
        connection.query(queryString2, [planID], function (err, result) {
          if (err) throw createError(400, err);
          return deleteUserNutritionPlan(planID, userID)
        })
        },
        deleteUserNutritionPlan = (planID, userID)=>{
          let queryString3 = `DELETE FROM nutrition_plan WHERE id = ? AND fk_user = ?;`
          connection.query(queryString3, [planID, userID], function (err, result) {
            if (err) throw createError(400, err);
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
      let resultArray = [];
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
          let results = res;
          resultArray.push(results)
          let gramsDivided = parseFloat(arrayObjects.grams) / 100;
          var queryString2 = "SELECT fk_food, fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";

          connection.query(queryString2, [gramsDivided, arrayObjects.fk_food], function (err, result) {
            if (err) throw err;
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
                })
              }
            }
          });
        });

      });

      connection.release();
      return cb(resultArray);

    });
  },


  postNutritionPlanNutrients: (obj, fkNutritionPlan, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
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
      if (err) handleMysqlConnectionError(err, connection)
      let dataArray = [], queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`, val = [userID]
      connection.query(queryString, val, (err, result) => {
        if (result.length === 0) return cb({ error: "No Nutrition Plan" })
        if (err) throw err;
        let maxLength = result.length;
        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = result[i], maxDate = new Date(), minDate = new Date(date);
          maxDate.setDate(minDate.getDate() + 1);
          let queryString2 = `SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date;`, vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]
          connection.query(queryString2, vals, (err, result2) => {
            if (err) throw err;
            let resultArray = [], maxLength2 = result2.length;
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
            if (i === (maxLength - 1)) return cb(dataArray)
          })
        }
      })
      connection.release();
    });
  },

  selectAverageMacros: (userID, dateFrom, dateTill, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let dataArray = [], val = [userID],
        queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        let maxLength = result.length;
        if (result.length === 0) return cb({ error: "No Nutrition Plan" })
        for (let i = 0; i < maxLength; i++) {
          let { amount, max_amount, name, unit, id } = result[i], maxDate = new Date(dateTill), minDate = new Date(dateFrom),
            queryString2 = `SELECT AVG(dailySum) as dailyAverage, date FROM (SELECT SUM(value) as dailySum, DATE(date_time) as date FROM user_nutrient WHERE fk_nutrient = ? AND fk_user = ? AND date_time >= ? AND date_time < ? GROUP BY date ORDER BY date) as average`,
            vals = [id, userID, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10)]
          maxDate.setDate(maxDate.getDate() + 1);
          connection.query(queryString2, vals, (err, result2) => {
            if (err) throw err;
            let resultArray = [], maxLength2 = result2.length;
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
            if (i === (maxLength - 1)) return cb(dataArray)
          })
        }
      })
      connection.release();
    });
  },

  userFoodLogs: (userId, dateFrom, dateTill, limit, offset, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let maxDate = new Date(dateTill), minDate = new Date(dateFrom)
      maxDate.setDate(maxDate.getDate() + 1);
      let val = [userId, minDate.toISOString().substring(0, 10), maxDate.toISOString().substring(0, 10), parseInt(offset), parseInt(limit)],
        queryString = `SELECT user_food.fk_food, user_food.grams, user_food.date, food.description, food.brand FROM user_food INNER JOIN food ON user_food.fk_food = food.id WHERE user_food.fk_user = ? AND date >= ? AND date < ? ORDER BY user_food.date LIMIT ?, ?;`
      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        cb(result);
      })
      connection.release();
    });
  },

  userNutrientsTimeline: (userID, dateFrom, dateTill, cb) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
      let dataArray = [];
      let queryString = `SELECT nutrition_plan_nutrients.amount, nutrition_plan_nutrients.max_amount, nutrient.id, nutrient.name, nutrient.unit FROM users INNER JOIN nutrition_plan_nutrients ON users.fk_active_nutrition_plan = nutrition_plan_nutrients.fk_nutrition_plan INNER JOIN nutrient ON nutrition_plan_nutrients.fk_nutrient = nutrient.id WHERE users.id = ?;`;
      let val = [userID]

      connection.query(queryString, val, (err, result) => {
        if (err) throw err;
        if (result.length === 0) return cb({ error: "No Nutrition Plan Or User" })
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
      if (err) handleMysqlConnectionError(err, connection)
      let gramsDivided = parseFloat(data.grams) / 100;
      var queryString = "SELECT fk_nutrient, amount * ? as value FROM food_nutrient WHERE fk_food = ?;";

      connection.query(queryString, [gramsDivided, data.fk_food], function (err, result) {
        if (err) throw err;

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

          if (i === result.length - 1) {
            let queryString3 = `DELETE FROM user_food WHERE fk_user = ? and DATE(date) = ? and fk_food = ? and grams = ? LIMIT 1;`

            connection.query(queryString3, [data.id, dataObject.date, data.fk_food, data.grams], function (err, response3) {

            })

          }
        }
      })
      connection.release();
      cb("done");
    });

  },

  selectActiveNutritionPlan: function (userID, cb) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) handleMysqlConnectionError(err, connection)
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