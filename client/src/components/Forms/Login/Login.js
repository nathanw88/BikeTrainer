import React from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API'
import Register from "../Register/Register"
import "./Login.css"
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  login = event=>{
  
    API.login(this.state.userEmail, this.state.userPassword).then(res => {
      if(res.data.error){
        alert(res.data.error)
      }
      else if(!res.data.error){
        localStorage.setItem("email", res.data.userEmail)
        localStorage.setItem("id", res.data.userID)
        window.location.replace('/profile')
      }
      

    }).catch(err => console.log(err));
    
  }

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {
    return (
      <Jumbotron id="login">
      <div>
          <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input type="email" name="userEmail" id="userEmail" onChange={this.handleInputChange} value={this.state.userEmail} placeholder="Example@web.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="userPassword" id="userPassword" onChange={this.handleInputChange} value={this.state.userPassword} placeholder="Password!" />
        </FormGroup>
        <Button id="login-button"
            disabled={
              !(
                this.state.userEmail &&
                this.state.userPassword
              )
            }
            onClick={() =>this.login()}
          >
             Login
          </Button>
       
      </Form>
            <br />
            <div>
        <Button id="register-button" onClick={this.toggle}>Register new user</Button>
        <div id="register-modal">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
          <Register/>
          </ModalBody>
          <ModalFooter>
            <Button id="cancel-button" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
      </div>
      </Jumbotron>
    );
  }
}

export default LoginModal;