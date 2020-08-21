const check = require('../utils/check.js');

test('Check if passed parameter is a number', ()=>{
  expect(check.isNumber("string")).toBe(false);
  expect(check.isNumber([])).toBe(false);
  expect(check.isNumber({})).toBe(false);
  expect(check.isNumber({1:1})).toBe(false);
  expect(check.isNumber([123])).toBe(false);
  expect(check.isNumber('123')).toBe(false);
  expect(check.isNumber(null)).toBe(false);
  expect(check.isNumber()).toBe(false);
  expect(check.isNumber(undefined)).toBe(false);
  expect(check.isNumber(true)).toBe(false);
  expect(check.isNumber(123)).toBe(true);
});

test('Check if passed parameter is a string', ()=>{
  expect(check.isString([123])).toBe(false);
  expect(check.isString([])).toBe(false);
  expect(check.isString(123)).toBe(false);
  expect(check.isString()).toBe(false);
  expect(check.isString(["abc"])).toBe(false);
  expect(check.isString({})).toBe(false);
  expect(check.isString({"abc":"abc"})).toBe(false);
  expect(check.isString(undefined)).toBe(false)
  expect(check.isString(null)).toBe(false)
  expect(check.isString(true)).toBe(false)
  expect(check.isString("string")).toBe(true);
  expect(check.isString("")).toBe(true);
});

test('Check if passed parameter is a date', ()=>{
  expect(check.isDate(undefined)).toBe(false);
  expect(check.isDate(null)).toBe(false);
  expect(check.isDate("")).toBe(false);
  expect(check.isDate("string")).toBe(false);
  expect(check.isDate(123)).toBe(false);
  expect(check.isDate([])).toBe(false);
  expect(check.isDate([new Date])).toBe(false);
  expect(check.isDate({})).toBe(false);
  expect(check.isDate({date:new Date})).toBe(false);
  expect(check.isDate(new Date)).toBe(true);
})

test('Check if passed parameter is a valid password', ()=>{
  expect(check.isPassword(123)).toBe(false);
  expect(check.isPassword("123")).toBe(false);
  expect(check.isPassword(null)).toBe(false);
  expect(check.isPassword(undefined)).toBe(false);
  expect(check.isPassword()).toBe(false);
  expect(check.isPassword([12345678])).toBe(false);
  expect(check.isPassword([])).toBe(false);
  expect(check.isPassword({})).toBe(false);
  expect(check.isPassword({1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8})).toBe(false);
  expect(check.isPassword("12345678")).toBe(true);
})

test('Check if passed parameter is an email', ()=>{
  expect(check.isEmail(123)).toBe(false);
  expect(check.isEmail("string")).toBe(false);
  expect(check.isEmail(["email@web.com"])).toBe(false);
  expect(check.isEmail({email:"email@web.com"})).toBe(false);
  expect(check.isEmail(undefined)).toBe(false);
  expect(check.isEmail(null)).toBe(false);
  expect(check.isEmail()).toBe(false);
  expect(check.isEmail(true)).toBe(false);
  expect(check.isEmail("string@string.com")).toBe(true);
  
})


