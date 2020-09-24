import React from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API'
import Register from "../Register/Register"
import { Col, Row, Container } from "../../Grid"
import "./Login.css"
class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    //declaring our state userEmail and userPassword are for the login form, modal is for if the modal is open for registering a new user
    this.state = {
      userEmail: "",
      userPassword: "",
      modal: false
    };
    // binding this on the toggle function so this will be taking about the loginModal so we don't have to use arrow functions
    this.toggle = this.toggle.bind(this);
  }
  //login function where the login data is send over to the utils API to be send to the backend 
  login = event => {

    API.login(this.state.userEmail, this.state.userPassword).then(res => {
      sessionStorage.setItem("email", res.data.userEmail)
      sessionStorage.setItem("id", res.data.userID)
      window.location.replace('/profile')
    }).catch(err => {
      console.log(err)
      alert("Please Make Sure Password And Email Are Correct")
    });

  }
  //function to update the state as the login for is changed
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // to change the state of the register modal to make it be rendered or not
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {
    return (
      <Jumbotron id="login">
        <div>
          {/* login form */}
          <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">Email</Label>
              <Input type="email" name="userEmail" id="userEmail" onChange={this.handleInputChange} value={this.state.userEmail} placeholder="Example@web.com" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input type="password" name="userPassword" id="userPassword" onChange={this.handleInputChange} value={this.state.userPassword} placeholder="Password!" />
            </FormGroup>
            <br />


          </Form>
          <br />
          <Container>
            <Row>
              <Col size="md-6">
                <Button className="login-button" id="login-button"
                  disabled={
                    !(
                      this.state.userEmail &&
                      this.state.userPassword
                    )
                  }
                  onClick={() => this.login()}
                >
                  Login
          </Button>
              </Col>


              <Col size="md-6">
                {/* Button to open the register modal */}
                <Button id="register-button" onClick={this.toggle}>Register</Button>
              </Col>
            </Row>
          </Container>
          <div id="register-modal">
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Register</ModalHeader>
              <ModalBody>
                <Register />
              </ModalBody>
              <ModalFooter>
                <Button id="cancel-button" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>

      </Jumbotron>
    );
  }
}

export default LoginModal;