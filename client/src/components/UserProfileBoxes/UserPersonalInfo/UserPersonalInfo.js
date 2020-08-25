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
      if (result.data.error) {

        // alert(result.data.error)
        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }

      }
      else {
        let { userPersonalInfo } = this.state;

        userPersonalInfo = result.data;
        this.setState({ userPersonalInfo });
      }
    });
  };


  handleInputChange = event => {
    const { userPersonalInfo } = this.state;
    const { name, value } = event.target;
    userPersonalInfo[name] = value;
    this.setState({ userPersonalInfo });
  };

  save = () => {
    let data = this.state.userPersonalInfo;
    data.id = this.state.userID
    API.updatePersonalInfo(data).then((result) => {
      // console.log(result)
      if (result.data.error) {

        alert(result.data.error)
        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }

      }
      else {
        window.location.replace("/user_profile")
        // console.log(result);
      }
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