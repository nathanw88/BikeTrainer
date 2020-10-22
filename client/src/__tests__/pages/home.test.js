import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Home from '../../pages/Home/Home';

test('Make sure everything is there', () => {
  render(<Home />);
  expect(screen.getByLabelText('Email')).toBeTruthy;
  expect(screen.getByLabelText('Password')).toBeTruthy;
  expect(screen.getByText('Login')).toBeTruthy;
  expect(screen.getByText('Register')).toBeTruthy;
});

test('Test if the register modal opens', () => {
  render(<Home />);
  expect(screen.queryByText('Register Modal')).toBeNull;
  fireEvent.click(screen.getByText('Register'))
  expect(screen.getByText('Register Modal')).toBeTruthy;
});

test('Login button is enabled with userEmail and userPassword', () => {
  render(<Home />);
  let userEmail = screen.getByLabelText('Email'),
    userPassword = screen.getByLabelText('Password'),
    loginButton = screen.getByText('Login');
  fireEvent.change(userEmail, { target: { value: 'testing@domain.web' } });
  fireEvent.change(userPassword, { target: { value: 'password' } });
  expect(loginButton).not.toBeDisabled();
});

test('Login button is disabled without userEmail and userPassword', () => {
  render(<Home />);
  let loginButton = screen.getByText('Login');
  expect(loginButton).toBeDisabled();
});

test('Login button is disabled without userEmail', () => {
  render(<Home />);
  let userPassword = screen.getByLabelText('Password'),
    loginButton = screen.getByText('Login');
  fireEvent.change(userPassword, { target: { value: 'password' } });
  expect(loginButton).toBeDisabled();
});

test('Login button is disabled without userPassword', () => {
  render(<Home />);
  let userEmail = screen.getByLabelText('Email'),
    loginButton = screen.getByText('Login');
  fireEvent.change(userEmail, { target: { value: 'testing@domain.web' } });
  expect(loginButton).toBeDisabled();
});