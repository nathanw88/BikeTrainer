import React, { Component } from "react";
import { Jumbotron, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import API from '../../../utils/API';
import "./UserPersonalInfo.css"

class UserMeasurements extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: parseInt(sessionStorage.getItem("id")),
      userPersonalInfo: {},
      edit: 0

    };
  };

  componentDidMount = () => {
    if (!sessionStorage.getItem("id")) {
      // alert("Please Login")
      window.location.replace("/")
    };

    API.getUserPersonalInfo(this.state.userID).then((result) => {
      let { userPersonalInfo } = this.state;
      userPersonalInfo = result.data;
      this.setState({ userPersonalInfo });

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  };


  handleInputChange = event => {
    const { userPersonalInfo } = this.state, { name, value } = event.target;
    userPersonalInfo[name] = value;
    this.setState({ userPersonalInfo });
  };

  save = () => {
    let data = this.state.userPersonalInfo;
    data.userID = this.state.userID
    API.updatePersonalInfo(data).then((result) => {
      window.location.replace("/user_profile")
    }).catch(error =>{
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  };

  edit = () => {
    let { edit } = this.state;

    this.setState((prevState) => ({ edit: !prevState.edit }))
  }



  render() {
    const { userPersonalInfo, edit } = this.state;

    return (

      <Jumbotron id="UserPersonalInfo-box" className="profile-box">
        <h2 className="text-center">User Info</h2>
        <br />
        {edit ? <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="userEmail" className="mr-sm-2">Email</Label>
            <Input type="email" name="userEmail" id="userEmail" onChange={this.handleInputChange} value={userPersonalInfo.userEmail || "email@website.com"} />

            <Label for="userBirthday" className="mr-sm-2">Birthday</Label>
            <Input type="date" name="userBirthday" id="userBirthday" onChange={this.handleInputChange} value={userPersonalInfo.userBirthday} />


          </FormGroup>
          <br />
          <Button id="login-button" onClick={() => this.save()}> Save </Button>
        </Form> :
          <div>

            <h5>Email: {userPersonalInfo.userEmail}</h5>
            <br />
            <h5>Birthday: {userPersonalInfo.userBirthday}</h5>
            <br />
            <Button id="login-button" onClick={() => this.edit()}> Edit </Button>
          </div>
        }

      </Jumbotron>
    );
  }
}

export default UserMeasurements;