import React from 'react';
import { fireEvent, render, screen } from "../../custom-render";
import AverageNutrients from "../../components/Profile_Boxes/AverageNutrients/AverageNutrients"
import API from "../../utils/API"

beforeEach((done) => {
  API.login("testing@front.end", "12345678").then((res) => {
    sessionStorage.setItem("email", res.data.userEmail)
    sessionStorage.setItem("id", res.data.userID)
    done()
  }).catch(err => {
    console.log(err)
  })
})

test('Make sure everything is there', (done) => {
  jest.setTimeout(300000)
  render(<AverageNutrients />);
  setTimeout(() => {
    screen.debug()
    done()
  }, 30000)

})