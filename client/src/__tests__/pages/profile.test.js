import React from 'react';
import { render, screen } from "../../custom-render";
import '@testing-library/jest-dom/extend-expect';
import Profile from '../../pages/Profile/Profile';
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
  render(<Profile />);
  setTimeout(() => {
    expect(screen.getByText("Daily Nutrients")).toBeTruthy;
    expect(screen.getByText("Daily Nutrients")).toBeTruthy;
    expect(screen.getByText("Average Daily Nutrients")).toBeTruthy;
    expect(screen.getByText("Daily Nutrition Bar Chart")).toBeTruthy;
    expect(screen.getByText("Nutrient Logs")).toBeTruthy;
    expect(screen.getByText("Nutrients Timeline")).toBeTruthy;
    done()
  }, 30000)

})