import React from 'react';
import {
  Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';
import API from '../../../utils/API'
import "./Register.css"


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
      userBirthday: "",
      validate: {
        emailState: "",
        passwordState: "",
        confirmPasswordState: "",
      }
    };
  this.handleInputChange = this.handleInputChange.bind(this);
}
handleInputChange = async (event) => {
    const { name, value } = event.target;
    await this.setState({
      [name]: value
    });
  };
  
  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  validatePassword(p){
    const password = p.target.value
    const { validate } = this.state
      if (password.length >= 8) {
        validate.passwordState = 'has-success'
      } else {
        validate.passwordState = 'has-danger'
      }
      this.setState({ validate })
    }

    confirmPassword(confirm){
      const password =confirm.target.value;
      const { validate } = this.state
        if (password === this.state.userPassword) {
          validate.confirmPasswordState = 'has-success'
        } else {
          validate.confirmPasswordState = 'has-danger'
        }
        this.setState({ validate })
      }
  
  register = event=>{
    let user = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userBirthday: this.state.userBirthday
    }
    API.register(user).then(res => {
      if(res.data.error){
        alert(res.data.error)
      }
      else if(!res.data.error){
        localStorage.setItem("email", this.state.userEmail)
        localStorage.setItem("id", res.data.insertId)
        window.location.replace('/profile')
      }

    }).catch(err => console.log(err));
  }
  render() {
    return (
      <Form>
       <FormGroup>
          <Label for="userEmail">Email</Label>
          <Input className={this.state.validate.emailState} valid={ this.state.validate.emailState === 'has-success' }
invalid={ this.state.validate.emailState === 'has-danger' } type="email" name="userEmail" value={this.state.userEmail} onChange={(e)=> {this.validateEmail(e); this.handleInputChange(e);}}/>
          <FormFeedback valid>Thanks for entering an email!</FormFeedback>
          <FormFeedback>Please enter a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input className={this.state.validate.passwordState} valid={ this.state.validate.passwordState === 'has-success' }
invalid={ this.state.validate.passwordState === 'has-danger'} type="password" name="userPassword" value={this.state.userPassword} onChange={(e)=> {this.validatePassword(e); this.handleInputChange(e);}} />
          <FormText>Enter a password at least 8 characters.</FormText>
          <FormFeedback valid>That's a correct password.</FormFeedback>
          <FormFeedback>Please enter a longer password.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input className={this.state.validate.confirmPasswordState} valid={ this.state.validate.confirmPasswordState === 'has-success' }
invalid={ this.state.validate.confirmPasswordState === 'has-danger'} type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={(e)=> {this.confirmPassword(e); this.handleInputChange(e);}} />
          <FormText>Please confirm your password.</FormText>
          <FormFeedback valid>Passwords match.</FormFeedback>
          <FormFeedback>Passwords don't match.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="age">Birthday</Label>
          <Input type="date" name="userBirthday" value={this.state.userBirthday} onChange={(e)=> {this.handleInputChange(e);}} />
          <FormText>Please enter your Birthday.</FormText>
        </FormGroup>
        <Button id="save-button"
              disabled={
                !(
                  (this.state.validate.emailState === 'has-success') &&
                  (this.state.validate.passwordState === 'has-success')&&
                  (this.state.validate.confirmPasswordState === 'has-success')&&
                  this.state.userBirthday
                )
              }
              onClick={() =>this.register()}
            >
               Save
            </Button>
      </Form>
             
    );
  }
}