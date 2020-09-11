const app = require('../server.js');
let request = require('supertest');
request = request.agent(app);
let newNutritionPlanID, whatID;

describe("users routes", () => {
  describe('post /login', () => {

    describe('status: 400', () => {
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

    describe('status: 200', () => {
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

    describe('status: 400', () => {

      test("Testing register route with no userBirthday", () => {
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

      test("Testing register route with email in the wrong format", () => {
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

      test("Testing register route with userBirthday not as a date", () => {
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

    describe('status: 200', () => {

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
    describe("status: 200", () => {
      test('Changing user info for qwq@qwq.qwq', () => {
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

    describe('status: 400', () => {

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

      test('making it fail sending only valid gender', () => {
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
  });

  describe("post /nutritionPlan", () => {

    describe("status: 400", () => {

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

      test('null for nutritionPlanNutrients.fats.amount', () => {
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
              fats: { id: 1004, amount: null },
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
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("nutritionPlanData Needs To Have name, descripption, and exercise_amount")
          });
      });

    });

    describe("status: 200", () => {

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

    describe("status: 400", () => {

      test("null sting inputs", () => {
        return request
          .delete('/api/users/nutritionPlan/null/null')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe('userID Should Be A Number')
          });
      });

      test("null string planID", () => {
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

    describe('status:200', () => {

      test("Delete nutrition plan created in earlier tests", () => {
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
    describe('status: 400', () => {

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

    describe("status: 200", () => {
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
    describe("status: 400", () => {
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

    describe("status: 200", () => {
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
    describe("status: 400", () => {
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

    describe("status: 200", () => {
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
    describe("status: 400", () => {

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

    describe("status: 200", () => {
      test("updating qwq@qwq.qwq personal info", () => {
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
});

describe("log routes", () => {
  describe("post /findFood", () => {
    describe("status: 400", () => {

      test("Testing find food route with no inputs", () => {
        return request
          .post('/api/log/findFood')
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test("Testing find food route with null passed in for parameters", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: null, searchString: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test("Testing find food route with undefined passed in for parameters", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: undefined, searchString: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test("Testing find food route with null searchString", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320, searchString: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("searchString Should Be A String")
          });
      });
      test("Testing find food route with undefined searchString", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320, searchString: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("searchString Should Be A String")
          });
      });

      test("Testing find food route with arrays passed in", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: [320, 20], searchString: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test("Testing find food route with array for searchString", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320, searchString: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("searchString Should Be A String")
          });
      });
      test("Testing find food route with missing searchString", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320 })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("searchString Should Be A String")
          });
      });
      test("Testing find food route with number for searchString", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320, searchString: 2 })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("searchString Should Be A String")
          });
      });
      test("Testing find food route with nonexistent user", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 9999999999, searchString: "eggs" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")
          });
      });
    });
    describe("status: 200", () => {
      beforeAll(async () => {
        await request
          .post('/api/users/login')
          .send({ userEmail: "testing@domain.web", userPassword: "password" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => { console.log("Logged in as testing@domain.web") });
      });

      test("Testing find food route with eggs for search", () => {
        return request
          .post('/api/log/findFood')
          .send({ fk_user: 320, searchString: "eggs" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([
              {
                "additional_description": null,
                "brand": "HERITAGE POULTRY & EGGS",
                "description": "HERITAGE POULTRY & EGGS, BEN ROBERTS' GRADE A LARGE EGGS",
                "gtin": "852659707805",
                "id": 577581,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Innovasian Cuisine Enterprises, LLC",
                "description": "FRIED RICE WITH EGGS & BACON SCRAMBLED EGGS AND BACON WITH SEASONED FRIED RICE AND VEGETABLES, FRIED RICE WITH EGGS & BACON",
                "gtin": "695119168002",
                "id": 720034,
                "name": null,
                "publication_date": "2019-12-06T06:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI 90 GR",
                "gtin": "07622210275790", "id": 354487,
                "name": null, "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI",
                "gtin": "07622210286703",
                "id": 354606,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI",
                "gtin": "05034660519195",
                "id": 354671,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY WINI EGGS CHOCOLATE MINI EGGS",
                "gtin": "07622210623461",
                "id": 354814,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI 328 GR",
                "gtin": "07622210275813",
                "id": 355003,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",

                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI 103 GR",
                "gtin": "07622210275837",
                "id": 355047,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI",
                "gtin": "07622210286727",
                "id": 355114,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "",
                "description": "CADBURY MINI EGGS CHOCOLATE EGGS MINI",
                "gtin": "07622210647610",
                "id": 355236,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "PEARL VALLEY EGGS",
                "description": "JUMBO EGGS",
                "gtin": "855161002352",
                "id": 446910, "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "KRAMER FARMS",
                "description": "EGGS ON THE RUN! HARD-COOKED EGGS",
                "gtin": "754102000108",
                "id": 466078,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "ROCKY MOUNTAIN EGGS",
                "description": "GRADE AA EXTRA LARGE EGGS",
                "gtin": "015204112220",
                "id": 486192,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "JEREMIAH CUNNINGHAM'S WORLD'S BEST EGGS",
                "description": "ORGANIC LARGE EGGS",
                "gtin": "85951200201",
                "id": 517383,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Topco Associates, Inc.",
                "description": "CAGE FREE EGGS-GRADE A-BROWN ONE DOZEN EGGS LARGE",
                "gtin": "036800133303",
                "id": 570443,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Sam Cooksey Eggs Inc.",
                "description": "FRESH GRADE AA MEDIUM EGGS",
                "gtin": "016784303503",
                "id": 576804,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Phil's Fresh Eggs",
                "description": "PHIL'S, CAGE FREE LARGE GRADE A BROWN OMEGA-3 EGGS",
                "gtin": "049502806604",
                "id": 577759,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Alderfer's Poultry Farm",
                "description": "SWISS VILLA EGGS, GRADE A LARGE BROWN EGGS",
                "gtin": "698264004201",
                "id": 578070,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "ROCKY MOUNTAIN EGGS",
                "description": "ORGANIC LARGE GRADE AA EGGS",
                "gtin": "015204153124",
                "id": 578451,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "DUCK DUCK EGGS",
                "description": "LARGE DUCK EGGS",
                "gtin": "869242000212",
                "id": 579301,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Best Eggs, LLC",
                "description": "FREE RANGE ORGANIC BROWN EGGS",
                "gtin": "857733005365",
                "id": 579488,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Best Eggs, LLC",
                "description": "FREE RANGE EGGS",
                "gtin": "857733005303",
                "id": 579489,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "COUNTRY FRESH EGGS",
                "description": "GRADE A MEDIUM EGGS",
                "gtin": "860474000117",
                "id": 579575,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "Russell Stover Candies Inc.",
                "description": "SHIMMER EGGS CRISPIES IN MILK CHOCOLATE, SHIMMER EGGS",
                "gtin": "077260063199",
                "id": 604738,
                "name": null,
                "publication_date": "2019-04-01T05:00:00.000Z"
              },
              {
                "additional_description": null,
                "brand": "TINA'S",
                "description": "EGGS, SAUSAGE & CHEDDAR CHEESE LOADED BREAKFAST BURRITO, EGGS, SAUSAGE & CHEDDAR CHEESE",
                "gtin": "079606020446",
                "id": 646190,
                "name": null,
                "publication_date": "2019-12-06T06:00:00.000Z"
              }
            ])
          });
      });
    });
  });
  describe("get /findPortion/:fk", () => {
    describe("status: 400", () => {
      test("Testing route with missing fk for food", () => {
        return request
          .get('/api/log/findPortion/:fk')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("fk Isn't A Number")
          });
      });
      test("Testing route with fk for food that doesn't exist", () => {
        return request
          .get('/api/log/findPortion/9999999999999999999')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([])
          });
      });
    });
    describe("status: 200", () => {
      test("Testing route with fk_food for whole grain oats", () => {
        return request
          .get('/api/log/findPortion/661924')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([{ id: 46845, fk_food: 661924, seq_num: null, amount: null, unit: null, description: '1/3 cup', gram_weight: 45 }])
          });
      });
    })
  });
  describe("post /food", () => {
    describe("status: 400", () => {
      test('Passing in no data', () => {
        return request
          .post('/api/log/food')
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in undefined for all data', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: undefined, grams: undefined, fk_food: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in null for all data', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: null, grams: null, fk_food: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in only correct fk_user the rest is undefined', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: undefined, fk_food: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in only correct fk_user the rest is null', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: null, fk_food: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in only correct fk_user and grams the rest is undefined', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: 200, fk_food: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in only correct fk_user and grams the rest is null', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: 200, fk_food: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in undefined for date', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: 200, fk_food: 661924, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in null for date', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: 200, fk_food: 661924, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Must Pass In fk_user, grams, date, and fk_food")
          });
      });
      test('Passing in strings for all', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: "string", grams: "string", fk_food: "string", date: "string" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("grams fk_food and date Should Be Arrays While fk_user Should Be A Number")
          });
      });
      test('Passing in correct fk_user the rest are array containing strings', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: ["string"], fk_food: ["string"], date: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Grams Are Numbers")
          });
      });
      test('Passing in string for fk_user arrays of string for the rest', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: "key", grams: ["string"], fk_food: ["string"], date: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("fk_user Should Be A Number")
          });
      });
      test('Passing in correct fk_user and grams the rest are arrays with strings', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [150], fk_food: ["string"], date: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Food Ids Are Numbers")
          });
      });
      test('Passing in correct data besides date', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200], fk_food: [577581], date: ["string"] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });
      test('Passing in correct fk_user the rest are arrays containing null', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [null], fk_food: [null], date: [null] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Grams Are Numbers")
          });
      });
      test('Passing in correct fk_user the rest are arrays containing undefined', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [undefined], fk_food: [undefined], date: [undefined] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Grams Are Numbers")
          });
      });
      test('Passing in correct fk_user and grams the rest are arrays with undefined', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200], fk_food: [undefined], date: [undefined] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Food Ids Are Numbers")
          });
      });
      test('Passing in correct data besides date', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200], fk_food: [577581], date: [undefined] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('Passing in correct data besides date', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200], fk_food: [577581], date: [null] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });
      test(`Length of grams, fk_food, and date arrays aren't matching`, () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200, 86, 200, 200, 100, 1000, 200, 86], fk_food: [577581, 629058, 577581, 365289, 578780, 632180, 577581, 629058], date: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("The Numer Of Food Ids, Grams, or Dates Not Matching")
          });
      });
      test('Passing in string for one element in fk_food array', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200, 86, 200, 200, 100, 1000, 200, 86], fk_food: [577581, 629058, 577581, 365289, 578780, 632180, "num", 629058], date: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Not All Food Ids Are Numbers")
          });
      });
      test('Passing invalid user id', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 9999999999999, grams: [200], fk_food: [577581], date: [new Date()] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")


          });
      });
    });
    describe("status: 200", () => {
      test('Passing in date for logging 200 grams of eggs', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200], fk_food: [577581], date: [new Date()] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([])
          });
      });

      test('Passing in 8 items to be logged', () => {
        return request
          .post('/api/log/food')
          .send({ fk_user: 320, grams: [200, 86, 200, 200, 100, 1000, 200, 86], fk_food: [577581, 629058, 577581, 365289, 578780, 632180, 577581, 629058], date: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([])
          });
      });
    })
  });
});

describe("user-logs route", () => {
  describe("get /dailySum/:userID/:date", () => {
    describe("status: 400", () => {
      test('null parameters', () => {
        return request
          .get('/api/user-logs/dailySum/null/null')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });

      test('null date parameter', () => {
        return request
          .get('/api/user-logs/dailySum/7/null')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("date Needs To Be A Valid Date")
          });
      });

      test(`passing in userID that's not logged in`, () => {
        return request
          .get(`/api/user-logs/dailySum/20/${new Date()}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")
          });
      });
    });

    test('user with no nutrition plan', () => {
      return request
        .get(`/api/user-logs/dailySum/7/${new Date("8/31/2020")}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe("No Nutrition Plan")
        });
    });
    describe("status: 200", () => {
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
      test('getting sums for what@what.what for august 31 2020', () => {
        return request
          .get(`/api/user-logs/dailySum/${whatID}/${new Date("8/31/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([
              {
                "amount": 2928,
                "log": [{ "dailySum": 1127.33, "date": "2020-08-31T05:00:00.000Z" }],
                "maxAmount": null,
                "name": "Calories",
                "unit": "KCAL"
              },
              {
                "amount": 65,
                "log": [{ "dailySum": 56.06, "date": "2020-08-31T05:00:00.000Z" }],
                "maxAmount": null,
                "name": "Total Fat",
                "unit": "G"
              },
              {
                "amount": 366,
                "log": [{ "dailySum": 85.487, "date": "2020-08-31T05:00:00.000Z" }],
                "maxAmount": null,
                "name": "Total Carbohydrate",
                "unit": "G"
              },
              {
                "amount": 219,
                "log": [{ "dailySum": 68.889, "date": "2020-08-31T05:00:00.000Z" }],
                "maxAmount": null,
                "name": "Protein",
                "unit": "G"
              }])
          });
      });
    });
  });

  describe("get /averageNutrients/:userID/:dateFrom/:dateTill", () => {
    describe("status: 400", () => {

      test('passing in incorrect parameters', () => {
        return request
          .get(`/api/user-logs/averageNutrients/:userID/:dateFrom/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });

      test('passing in correct userID the rest are incorrect parameters', () => {
        return request
          .get(`/api/user-logs/averageNutrients/${whatID}/:dateFrom/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in userID and one correct date parameters', () => {
        return request
          .get(`/api/user-logs/averageNutrients/${whatID}/${new Date()}/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in userID and one correct date parameters', () => {
        return request
          .get(`/api/user-logs/averageNutrients/${whatID}/:dateFrom/${new Date()}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in user who has no nutrition plan', () => {
        return request
          .get(`/api/user-logs/averageNutrients/7/${new Date("8/30/2020")}/${new Date("8/31/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("No Nutrition Plan")
          });
      });
      test(`passing in user who doesn't exsist`, () => {
        return request
          .get(`/api/user-logs/averageNutrients/99999999999/${new Date("8/30/2020")}/${new Date("8/31/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")
          });
      });
    })

    describe("status: 200", () => {

      test('getting data for what@what.what', () => {
        return request
          .get(`/api/user-logs/averageNutrients/${whatID}/${new Date("8/29/2020")}/${new Date("9/1/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([{
              "amount": 2928,
              "log": [{
                "dailyAverage": 638.665,
                "date": "2020-08-30T05:00:00.000Z",
              }],
              "maxAmount": null,
              "name": "Calories",
              "unit": "KCAL"
            },
            {
              "amount": 65,
              "log": [{
                "dailyAverage": 29.53,
                "date": "2020-08-30T05:00:00.000Z",
              }],
              "maxAmount": null,
              "name": "Total Fat",
              "unit": "G"
            },
            {
              "amount": 366,
              "log": [{
                "dailyAverage": 56.2435,
                "date": "2020-08-30T05:00:00.000Z",
              }],
              "maxAmount": null,
              "name": "Total Carbohydrate",
              "unit": "G"
            },
            {
              "amount": 219,
              "log": [{
                "dailyAverage": 36.9445,
                "date": "2020-08-30T05:00:00.000Z",
              }],
              "maxAmount": null,
              "name": "Protein",
              "unit": "G"
            }])
          });
      });
    })
  })

  describe("get /userNutrientsTimeline/:userID/:dateFrom/:dateTill", () => {
    describe("status:400", () => {

      test('passing in all incorrect parameters', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/:userID/:dateFrom/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });

      test('passing in a userID all other inputs are incorrect', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/7/:dateFrom/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in a userID and one date other date is still incorrect', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/7/${new Date()}/:dateTill`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in a userID and one date other date is still incorrect', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/7/:dateFrom/${new Date()}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('userID with no nutrition plan', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/7/${new Date("8/30/2020")}/${new Date("9/1/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("No Nutrition Plan")
          });
      });

      test('userID for nonexistent user', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/9999999/${new Date("8/30/2020")}/${new Date("9/1/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")
          });
      });
    });

    describe("status: 200", () => {
      test('userID for what@what.what', () => {
        return request
          .get(`/api/user-logs/userNutrientsTimeline/${whatID}/${new Date("8/29/2020")}/${new Date("9/1/2020")}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([
              {
                "amount": 2928,
                "log": [
                  {
                    "dailySum": 150,
                    "date": "2020-08-30T05:00:00.000Z",
                  },
                  {
                    "dailySum": 1127.33,
                    "date": "2020-08-31T05:00:00.000Z",
                  },
                ],
                "maxAmount": null,
                "name": "Calories",
                "unit": "KCAL"
              },
              {
                "amount": 65,
                "log": [
                  {
                    "dailySum": 3,
                    "date": "2020-08-30T05:00:00.000Z",
                  },
                  {
                    "dailySum": 56.06,
                    "date": "2020-08-31T05:00:00.000Z",
                  },
                ],
                "maxAmount": null,
                "name": "Total Fat",
                "unit": "G"
              },
              {
                "amount": 366,
                "log": [
                  {
                    "dailySum": 27,
                    "date": "2020-08-30T05:00:00.000Z",
                  },
                  {
                    "dailySum": 85.487,
                    "date": "2020-08-31T05:00:00.000Z",
                  },
                ],
                "maxAmount": null,
                "name": "Total Carbohydrate",
                "unit": "G"
              },
              {
                "amount": 219,
                "log": [
                  {
                    "dailySum": 5,
                    "date": "2020-08-30T05:00:00.000Z",
                  },
                  {
                    "dailySum": 68.889,
                    "date": "2020-08-31T05:00:00.000Z",
                  },
                ],
                "maxAmount": null,
                "name": "Protein",
                "unit": "G"
              }])
          });
      });
    });
  });

  describe("get /userFoodLogs/:userID/:dateFrom/:dateTill/:limit/:offset", () => {
    describe("status: 400", () => {
      test('passing in all incorrect parameters', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/:userID/:dateFrom/:dateTill/:limit/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });

      test('passing in userID all else are incorrect parameters', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/:dateFrom/:dateTill/:limit/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in correct userID and dateFrom', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/${new Date("8/30/2020")}/:dateTill/:limit/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in correct userID and dateTill', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/:dateFrom/${new Date("9/1/2020")}/:limit/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Dates Aren't Dates")
          });
      });

      test('passing in correct userID and dates while passing incorrect limit and offset', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/${new Date("8/30/2020")}/${new Date("9/1/2020")}/:limit/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("limit And offset Should Be Numbers")
          });
      });

      test('passing in incorrect offset', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/${new Date("8/30/2020")}/${new Date("9/1/2020")}/5/:offset`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("limit And offset Should Be Numbers")
          });
      });

      test('passing in incorrect limit', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/${new Date("8/30/2020")}/${new Date("9/1/2020")}/:limit/0`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("limit And offset Should Be Numbers")
          });
      });
      test('passing in incorrect user for session', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/9999999999999999999/${new Date("8/25/2020")}/${new Date("9/1/2020")}/5/0`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.");
          });
      });
    })
    describe("status: 200", () => {
      test('passing in correct data', () => {
        return request
          .get(`/api/user-logs/userFoodLogs/7/${new Date("8/25/2020")}/${new Date("9/1/2020")}/5/0`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toStrictEqual([
              { "brand": "The Quaker Oats Company", "date": "2020-08-31T19:23:00.000Z", "description": "STEEL CUT QUICK 3-MINUTE 100% WHOLE GRAIN OATS, WHOLE GRAIN", "fk_food": 661924, "grams": 100 },
              { "brand": "Dole Packaged Foods Company", "date": "2020-08-31T19:23:00.000Z", "description": "SLICED STRAWBERRIES AND BLUEBERRIES MIX, STRAWBERRIES AND BLUEBERRIES", "fk_food": 632462, "grams": 140 }])
          });
      });
    })
  });

  describe("delete / userLogs", () => {
    describe("status: 400", () => {
      test('passing in no data', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test('passing in null for all data', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: null, fk_food: null, grams: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test('passing in null for all data besides userID', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: null, grams: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("fk_food Should Be A Number")
          });
      });
      test('passing in null for all data besides userID and fk_food', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: 577581, grams: null, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("grams Should Be A Number")
          });
      });

      test('passing in null for date', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: 577581, grams: 200, date: null })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("date Should Be A Date")
          });
      });

      test('passing in undefined for all data', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: undefined, fk_food: undefined, grams: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("userID Should Be A Number")
          });
      });
      test('passing in undefined for all data besides userID', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: undefined, grams: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("fk_food Should Be A Number")
          });
      });
      test('passing in undefined for all data besides userID and fk_food', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: 577581, grams: undefined, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("grams Should Be A Number")
          });
      });
      test('passing in undefined for date', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 7, fk_food: 577581, grams: 200, date: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("date Should Be A Date")
          });
      });
      test('passing in correct userID the rest is strings', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 320, fk_food: "num", grams: "string", date: "string" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("fk_food Should Be A Number")
          });
      });
      test('passing in strings for grams and date', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 320, fk_food: 577581, grams: "string", date: "string" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("grams Should Be A Number")
          });
      });

      test('passing in incorrect date', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 320, fk_food: 577581, grams: 200, date: "string" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("date Should Be A Date")
          });
      });

      test('passing in user with no session', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 999999999999999, fk_food: 577581, grams: 200, date: new Date() })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body.message).toBe("Your session has expired.")
          });
      });
    });

    describe("status: 200", () => {
      test('deleting egg log for testing@domain.web', () => {
        return request
          .delete(`/api/user-logs/userLogs`)
          .send({ userID: 320, fk_food: 577581, grams: 200, date: new Date() })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toBe("done")
          });
      });
    })
  });

});


