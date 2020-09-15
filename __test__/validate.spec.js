const validate = require('../utils/validate.js');

describe('validate if passed parameter is a number', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isNumber("string")).toBe(false);
    expect(validate.isNumber('123')).toBe(false);
    expect(validate.isNumber([123])).toBe(false);
    expect(validate.isNumber([])).toBe(false);
    expect(validate.isNumber({ 1: 1 })).toBe(false);
    expect(validate.isNumber({})).toBe(false);
    expect(validate.isNumber(null)).toBe(false);
    expect(validate.isNumber()).toBe(false);
    expect(validate.isNumber(undefined)).toBe(false);
    expect(validate.isNumber(true)).toBe(false);
    expect(validate.isNumber(false)).toBe(false);
    expect(validate.isNumber(NaN)).toBe(false);
  });
  test('Checking if passing in correct parameter return true', () => {
    expect(validate.isNumber(123)).toBe(true);
    expect(validate.isNumber(0)).toBe(true);
  });
});

describe('validate if passed parameter is a string', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isString([123])).toBe(false);
    expect(validate.isString([])).toBe(false);
    expect(validate.isString(123)).toBe(false);
    expect(validate.isString()).toBe(false);
    expect(validate.isString(["abc"])).toBe(false);
    expect(validate.isString({})).toBe(false);
    expect(validate.isString({ "abc": "abc" })).toBe(false);
    expect(validate.isString(undefined)).toBe(false)
    expect(validate.isString(null)).toBe(false)
    expect(validate.isString(true)).toBe(false)
  });
  test('Checking if passing in correct parameter returns true', () => {
    expect(validate.isString("string")).toBe(true);
    expect(validate.isString("")).toBe(true);
  });
});

describe('validate if passed parameter is a date', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isDate(undefined)).toBe(false);
    expect(validate.isDate(null)).toBe(false);
    expect(validate.isDate("")).toBe(false);
    expect(validate.isDate("string")).toBe(false);
    expect(validate.isDate(123)).toBe(false);
    expect(validate.isDate([])).toBe(false);
    expect(validate.isDate([new Date])).toBe(false);
    expect(validate.isDate({})).toBe(false);
    expect(validate.isDate({ date: new Date })).toBe(false);
  });
  test('Checking if passing in correct parameter returns true', () => {
    expect(validate.isDate(new Date)).toBe(true);
  });
})

describe('validate if passed parameter is a valid password', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isPassword(123)).toBe(false);
    expect(validate.isPassword("123")).toBe(false);
    expect(validate.isPassword(null)).toBe(false);
    expect(validate.isPassword(undefined)).toBe(false);
    expect(validate.isPassword()).toBe(false);
    expect(validate.isPassword([12345678])).toBe(false);
    expect(validate.isPassword([])).toBe(false);
    expect(validate.isPassword({})).toBe(false);
    expect(validate.isPassword({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 })).toBe(false);
  });
  test('Checking if passing in correct parameter returns true', () => {
    expect(validate.isPassword("12345678")).toBe(true);
  });
})

describe('validate if passed parameter is an email', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isEmail(123)).toBe(false);
    expect(validate.isEmail("string")).toBe(false);
    expect(validate.isEmail(["email@web.com"])).toBe(false);
    expect(validate.isEmail({ email: "email@web.com" })).toBe(false);
    expect(validate.isEmail(undefined)).toBe(false);
    expect(validate.isEmail(null)).toBe(false);
    expect(validate.isEmail()).toBe(false);
    expect(validate.isEmail(true)).toBe(false);
  });
  test('Checking if passing in correct parameter returns true', () => {
    expect(validate.isEmail("string@string.com")).toBe(true);
  });
})

describe('validate if passed parameter is a string containing numbers', () => {
  test('Checking if passing in incorrect parameter returns false', () => {
    expect(validate.isNumberString("string")).toBe(false);
    expect(validate.isNumberString([123])).toBe(false);
    expect(validate.isNumberString([])).toBe(false);
    expect(validate.isNumberString({ 1: 1 })).toBe(false);
    expect(validate.isNumberString({})).toBe(false);
    expect(validate.isNumberString(null)).toBe(false);
    expect(validate.isNumberString()).toBe(false);
    expect(validate.isNumberString(undefined)).toBe(false);
    expect(validate.isNumberString(true)).toBe(false);
    expect(validate.isNumberString(false)).toBe(false);
  });
  test('Checking if passing in correct parameter return true', () => {
    expect(validate.isNumberString(0)).toBe(true);
    expect(validate.isNumberString(123)).toBe(true);
    expect(validate.isNumberString('123')).toBe(true);
  });
});

