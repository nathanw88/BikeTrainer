const app = require('../server.js');
const request = require('supertest');

describe('post /login with incorrect inputs', () => {
  test('Testing login route with missing userPassword', () => {
    return request(app)
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
    return request(app)
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
    return request(app)
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
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: "qwq@qwq.qwq", userPassword: "wrongPassword" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Incorrect Password")
      })
  });

  test("Testing login route with email that doesn't exist ", () => {
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: "no@email.com", userPassword: "Doesn'tMatterWrongEmail" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Email Does Not Exist")
      })
  });

  test("Testing login route with password in an array", () => {
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: "qwq@qwq.qwq", userPassword: ["qwe123QWE!@#"] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Password Isn't A String")
      })
  });

  test("Testing login route with number for password", () => {
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: "qwq@qwq.qwq", userPassword: 123546 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Password Isn't A String")
      })
  });

  test("Testing login route with email in an array", () => {
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: ["qwq@qwq.qwq"], userPassword: "qwe123QWE!@#" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe("Email Isn't Correct")
      })
  });
});

describe('post /login with correct input', () => {
  test('Testing login route with qwq@qwq.qwq userEmail and correct password', () => {
    return request(app)
      .post('/api/users/login')
      .send({ userEmail: "qwq@qwq.qwq", userPassword: "qwe123QWE!@#" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.userID).toBe(7)
        expect(response.body.userEmail).toBe("qwq@qwq.qwq")
      })
  });
});
