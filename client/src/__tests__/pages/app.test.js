import React from 'react';
import { fireEvent, render, screen } from "../../custom-render";
import App from '../../App';



test('Make sure everything is there', (done) => {
  render(<App />);
  
  let userEmail = screen.getByLabelText('Email'),
    userPassword = screen.getByLabelText('Password'),
    loginButton = screen.getByText('Login');
  fireEvent.change(userEmail, { target: { value: 'testing@domain.web' } });
  fireEvent.change(userPassword, { target: { value: 'password' } });
  fireEvent.click(loginButton);
 
  setTimeout(()=>{
    expect(sessionStorage.getItem("id")).toBeDefined()
    done()
  },3000)   



});
