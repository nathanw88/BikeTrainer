const app = require('../server.js');
let request = require('supertest');
const nutritionPlan = require('../models/nutritionPlan.js');
// const cookieParser = require('cookie-parser')
request = request.agent(app);
let newNutritionPlanID;

describe('post /login', () => {

  describe('post /login with incorrect inputs', () => {
    test('Testing login route with missing userPassword', () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Data must include userPassword and userEmail")
        });
    });

    test('Testing login route with missing userEmail', () => {
      return request
        .post('/api/users/login')
        .send({ userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Data must include userPassword and userEmail")
        });
    });

    test('Testing login route with no input', () => {
      return request
        .post('/api/users/login')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Data must include userPassword and userEmail")
        });
    });

    test('Testing login route with qwq@qwq.qwq userEmail and incorrect password', () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "wrongPassword" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Incorrect Password")
        });
    });

    test("Testing login route with email that doesn't exist ", () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "no@email.com", userPassword: "Doesn'tMatterWrongEmail" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Email Does Not Exist")
        });
    });

    test("Testing login route with password in an array", () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: ["qwe123QWE!@#"] })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Password Isn't A String")
        });
    });

    test("Testing login route with number for password", () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: 123546 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Password Isn't A String")
        });
    });

    test("Testing login route with email in an array", () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: ["qwq@qwq.qwq"], userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Email Isn't Correct")
        });
    });
  });

  describe('post /login with correct input', () => {
    test('Testing login route with qwq@qwq.qwq userEmail and correct password', () => {
      return request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toStrictEqual({
            "userEmail": "qwq@qwq.qwq",
            "userID": 7
          })
        });
    });
  });
});

describe('post /register', () => {

  describe('post /register with incorrect input', () => {

    test("Testing register route with missing inputs", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Input must have userEmail, userPassword, and userBirthday")
        });
    });

    test("Testing register route with incorrect email", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "qwqqwq.qwq", userPassword: "qwe123QWE!@#", userBirthday: new Date })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Email Isn't Correct")
        });
    });

    test("Testing register route with incorrect birthday", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#", userBirthday: "notADate" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Incorrect Date For Birthday")
        });
    });

    test("Testing register route with to short of a password", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "short", userBirthday: new Date })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Invalid Password Needs To Have 8 Characters")
        });
    });

    test("Testing register route with email already in system", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "qwQ@Qwq.qWq", userPassword: "qwe123QWE!@#", userBirthday: new Date })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Email Already Registered")
        });
    });
  });

  describe('post /register with correct input', () => {

    test("Testing register route with new user", () => {
      return request
        .post('/api/users/register')
        .send({ userEmail: "new@new.new", userPassword: "newPassword", userBirthday: new Date })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.affectedRows).toBe(1)
          expect(response.body.insertId).toBeDefined()
        });
    });
  });
});

describe('Delete new test user just made', () => {

  test("Delete Test user", () => {
    return request
      .delete('/api/users/deleteTestUser')
      .send({ userEmail: "new@new.new", userPassword: "newPassword" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message).toBe("Deleted User new@new.new")
      });
  });
});

describe('post /setup', () => {
  test('working correctly', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "female", weight: 72, height: 180, metric: 0, userID: 7 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.affectedRows).toBe(1)
      });
  });
});

describe('post /setup Making it fail', () => {

  beforeAll(() => {
    return request
      .delete('/api/users/logout')
      .send({ userID: 7 })
      .set('Accept', 'application/json')
      .expect(200)
  });

  test('making it fail with no data', () => {
    return request
      .post('/api/users/setup')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Gender Isn't A String")
      });
  });

  test('making it fail with only valid gender', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "female" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Weight Isn't A Number`)
      });
  });

  test('making it fail missing height, metric, and userID', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "male", weight: 150 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Height Isn't A Number`)
      });
  });

  test('making it fail missing metric and userID', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "female", weight: 150, height: 175 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Metric Should Be 0 Or 1`)
      });
  });

  test('making it fail missing userID', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "female", weight: 150, height: 175, metric: 0 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`userID Should Be A Number`)
      });
  });

  test('correct data passed in without logging in', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "female", weight: 72, height: 180, metric: 0, userID: 7 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('Your session has expired.')
      });
  });

  test('null passed in for all parameters', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: null, weight: null, height: null, metric: null, userID: null })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Gender Isn't A String`)
      });
  });

  test('null passed in for all parameters beside gender', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "male", weight: null, height: null, metric: null, userID: null })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Weight Isn't A Number`)
      });
  });

  test('null passed in for all parameters beside gender and weight', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "male", weight: 72, height: null, metric: null, userID: null })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Height Isn't A Number`)
      });
  });

  test('null passed in for metric and userID', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "male", weight: 72, height: 180, metric: null, userID: null })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`Metric Should Be 0 Or 1`)
      });
  });

  test('null passed in for userID', () => {
    return request
      .post('/api/users/setup')
      .send({ gender: "male", weight: 72, height: 180, metric: 0, userID: null })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe(`userID Should Be A Number`)
      });
  });
});

describe("post /nutritionPlan", () => {

  describe("Incorrect nutrition plan posting", () => {

    test('null for user id', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: null,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel!",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe('userID Should Be A Number')
        });
    });

    test('null for nutritionPlanData.name', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: null,
            description: "Carbs For Fuel!",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Name, Description, And Exercise Amount Need To Be Strings")
        });
    });

    test('null for nutritionPlanData.description', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: null,
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Name, Description, And Exercise Amount Need To Be Strings")
        });
    });

    test('null for nutritionPlanData.exercise_amount', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel",
            exercise_amount: null
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Name, Description, And Exercise Amount Need To Be Strings")
        });
    });

    test('null for nutritionPlanNutrients.calories.id', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: null, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("id And Amount Of Each Nutrient Must Be A Number")
        });
    });

    test('null for nutritionPlanNutrients.calories.amount', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: null },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("id And Amount Of Each Nutrient Must Be A Number")
        });
    });

    test('null for nutritionPlanNutrients.fats.id', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: null, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("id And Amount Of Each Nutrient Must Be A Number")
        });
    });

    test('null for nutritionPlanData', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: null,
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("nutritionPlanData Needs To Have name, descripption, and exercise_amount")
        });
    });

    test('null for nutritionPlanNutrients', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel!",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: null
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("nutritionPlanNutrients Must Contain Nutrients With id and amount For Each")
        });
    });

    test('no data sent', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({

        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("nutritionPlanData Needs To Have name, descripption, and exercise_amount")
        });
    });

  });

  describe("Correct nutrition plan posting", () => {

    beforeAll(async () => {
      await request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => { console.log("Logged in as qwq@qwq.qwq") });
    });

    test('logging new nutrition plan', () => {
      return request
        .post('/api/users/nutritionPlan')
        .send({
          id: 7,
          nutritionPlanData: {
            name: "Runner's Delight",
            description: "Carbs For Fuel!",
            exercise_amount: "Hardcore Exercise"
          },
          nutritionPlanNutrients: {
            calories: { id: 1008, amount: 2906 },
            fats: { id: 1004, amount: 41 },
            carbs: { id: 1005, amount: 464 },
            protein: { id: 1003, amount: 167 }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.affectedRows).toBe(1)
          newNutritionPlanID = response.body.insertId
        });
    });
  });
});

describe('delete /nutritionPlan/:planID/:userID', () => {

  describe("failing tests", () => {

    test("null inputs", () => {
      return request
        .delete('/api/users/nutritionPlan/null/null')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe('userID Should Be A Number')
        });
    });

    test("null planID", () => {
      return request
        .delete('/api/users/nutritionPlan/null/7')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe('planID Should Be A Number')
        });
    });

    test("planID that doesn't exist", () => {
      return request
        .delete('/api/users/nutritionPlan/999999999/7')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("No nutrition plan to delete")
        });
    });

    test("userID that doesn't fit with planID", () => {
      return request
        .delete('/api/users/nutritionPlan/3/7')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("No nutrition plan to delete")
        })
    });
  });

  describe('Delete nutrition plan created in earlier tests', () => {

    test("passing in variable for planID created in earlier test ", () => {
      return request
        .delete(`/api/users/nutritionPlan/${newNutritionPlanID}/7`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.affectedRows).toBe(1)
        })
    });
  })
});

describe('get /measurments/:userID', () => {
  describe('Failing tests', () => {

    test("passing in null as userID", () => {
      return request
        .get(`/api/users/measurements/null`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("userID Should Be A Number")
        })
    });

    test("passing in userID that doesn't exist", () => {
      return request
        .get(`/api/users/measurements/999999999999`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Your session has expired.")
        })
    });
  })

  describe("passing test", () => {
    test("passing in userID for qwq@qwq.com", () => {
      return request
        .get(`/api/users/measurements/7`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toStrictEqual({
            "gender": "female",
            "height": 180,
            "metric": 0,
            "userBirthday": "1988-03-15",
            "weight": 72,
          })
        })
    });
  })
})

describe("get /nutritionPlan/:userID", () => {
  describe("failing tests", () => {
    test("passing in null for userID", () => {
      return request
        .get(`/api/users/nutritionPlan/null`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("userID Should Be A Number")
        })
    });

    test("passing in userID that has no active nutrition plan", () => {
      return request
        .get(`/api/users/nutritionPlan/7`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("User Has No Active Nutrition Plan")
        })
    });

    test("passing in userID for user that doesn't exist", () => {
      return request
        .get(`/api/users/nutritionPlan/999999999`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Your session has expired.")
        })
    });
  })

  describe("correct userID sent in", () => {
    let whatID
    beforeAll(async () => {
      await request
        .post('/api/users/login')
        .send({ userEmail: "what@what.what", userPassword: "12345678" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          console.log("loggedin")
          whatID = response.body.userID
        });
    });
    test("passing in userID for user what@what.what", () => {
      return request
        .get(`/api/users/nutritionPlan/${whatID}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toStrictEqual({
            "nutritionPlan": {
              "age": null,
              "description": "Carbs!!!",
              "exercise_amount": "Hardcore Exercise",
              "fk_user": whatID,
              "goals": null,
              "id": 75,
              "name": "Cardio Dream",
              "public": null,
            },
            "nutritionPlanData": [
              {
                "amount": 2928,
                "id": 1008,
                "max_amount": null,
                "name": "Calories",
                "unit": "KCAL",
              },
              {
                "amount": 65,
                "id": 1004,
                "max_amount": null,
                "name": "Total Fat",
                "unit": "G",
              },
              {
                "amount": 366,
                "id": 1005,
                "max_amount": null,
                "name": "Total Carbohydrate",
                "unit": "G",
              },
              {
                "amount": 219,
                "id": 1003,
                "max_amount": null,
                "name": "Protein",
                "unit": "G",
              },
            ],
          });
        });
    });
  });
});

describe("get /personalInfo", () => {
  describe("incorrect userID passed in as param", () => {
    test("passing in null for userID", () => {
      return request
        .get(`/api/users/personalInfo/null`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("userID Should Be A Number")
        })
    });

    test("passing in userID for user that doesn't exist", () => {
      return request
        .get(`/api/users/personalInfo/999999999`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Your session has expired.")
        })
    });
  })

  describe("Correct parameters passed in", () => {
    beforeAll(async () => {
      await request
        .post('/api/users/login')
        .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => { console.log("Logged in as qwq@qwq.qwq") });
    });

    test("passing in userID for user qwq@qwq.qwq", () => {
      return request
        .get(`/api/users/personalInfo/7`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toStrictEqual({
            "userBirthday": "1988-03-15",
            "userEmail": "qwq@qwq.qwq",
          })
        })
    })

  })
})

describe("put /personalInfo", () => {
  describe("incorrect data sent in", () => {

    test("sending in null", () => {
      return request
        .put('/api/users/personalInfo')
        .send(null)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Data must contain userID, userEmail, and userBirthday")
        });
    });

    test("sending in string for userID", () => {
      return request
        .put('/api/users/personalInfo')
        .send({ userID: "string", userEmail: "what@what.what", userBirthday: "1988-03-15" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("userID Should Be A Number")
        });
    });

    test("sending in not signed in userID", () => {
      return request
        .put('/api/users/personalInfo')
        .send({ userID: "13", userEmail: "what@what.what", userBirthday: "1988-03-15" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Your session has expired.")
        });
    });

    test("sending in a string that's not an email", () => {
      return request
        .put('/api/users/personalInfo')
        .send({ userID: "7", userEmail: "not an email", userBirthday: "1988-03-15" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Email Isn't Correct")
        });
    });

    test("sending in a string that's not a date", () => {
      return request
        .put('/api/users/personalInfo')
        .send({ userID: "7", userEmail: "email@domain.com", userBirthday: "date" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("Incorrect Date For Birthday")
        });
    });
  });

  describe("sending in correct Data", ()=>{
    test("sending in a string that's not a date", () => {
      return request
        .put('/api/users/personalInfo')
        .send({ userID: "7", userEmail: "qwq@qwq.qwq", userBirthday: "1988-03-15" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.affectedRows).toBe(1)
        });
    }); 
  })
});
