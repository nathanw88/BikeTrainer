import React, { Component } from "react";
import { Jumbotron, Label, Input, Button, Form, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, FormGroup } from 'reactstrap';
import API from '../../../utils/API';
import "./UserMeasurements.css";
import convert, { cmToFtRemainderInInches } from "../../../utils/convert.js";

class UserMeasurements extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: sessionStorage.getItem("id"),
      userMeasurements: {}

    };
  };

  componentDidMount = () => {
    if (!sessionStorage.getItem("id")) {
      window.location.replace("/")
    };

    API.getUserMeasurements(this.state.userID).then((result) => {
      if (result.data.error) {

        alert(result.data.error)
        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }

      }
      else {
        const { userMeasurements } = this.state;
        let values = Object.values(result.data);
        let keys = Object.keys(result.data);
        let length = keys.length;

        for (let i = 0; i < length; i++) {
          userMeasurements[keys[i]] = values[i]
        };
        if (!userMeasurements.metric) {
          var { ft, inches } = convert.cmToFtRemainderInInches(userMeasurements.height);
          userMeasurements.weight = convert.kgToLbs(userMeasurements.weight);
          userMeasurements.heightFeet = ft;
          userMeasurements.heightInches = inches;

        }
        this.setState({ userMeasurements });
      }
    });
  };


  handleInputChange = event => {
    const { userMeasurements } = this.state;
    const { name, value } = event.target;
    userMeasurements[name] = value;
    this.setState({ userMeasurements });

  };

  save = () => {
    let data = {
      gender: this.state.userMeasurements.gender,
      userID: sessionStorage.getItem("id"),
      weight: 0,
      height: 0,
      metric: parseInt(this.state.userMeasurements.metric)
    };

    if (data.metric) {
      data.weight = this.state.userMeasurements.weight;
      data.height = this.state.userMeasurements.height;
    }
    else if (!data.metric) {
      data.weight = convert.lbsToKg(this.state.userMeasurements.weight);
      data.height = convert.ftAndInchesToCm(this.state.userMeasurements.heightFeet, this.state.userMeasurements.heightInches);
    }

    API.saveSetup(data).then((result) => {
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
      }
    });
  };

  clickHandler = event => {

    const { userMeasurements } = this.state;
    const { name, value } = event.target;
    userMeasurements[name] = value;
    this.setState({ userMeasurements });

  };

  metricHandler = event => {
    const { userMeasurements } = this.state;
    const { value } = event.target;
    if (parseInt(value) !== parseInt(userMeasurements.metric)) {
      if (parseInt(value)) {
        userMeasurements.weight = convert.lbsToKg(userMeasurements.weight);
      }
      else if (!parseInt(value)) {
        userMeasurements.weight = convert.kgToLbs(userMeasurements.weight);
      }
      userMeasurements.metric = parseInt(value);
      this.setState({ userMeasurements });
    }

  }



  render() {
    const { userMeasurements } = this.state;

    return (

      <Jumbotron id="UserMeasurements-box" className="profile-box">
        <h2 className="text-center">Measurements</h2>
        <div>
          <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {userMeasurements.gender}
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={userMeasurements.gender === "male"} onClick={this.clickHandler} value="male" name="gender" className="portion-button"> Male </DropdownItem>
                  <DropdownItem active={userMeasurements.gender === "female"} onClick={this.clickHandler} value="female" name="gender" className="portion-button"> Female</DropdownItem>
                  <DropdownItem active={userMeasurements.gender === "other"} onClick={this.clickHandler} value="other" name="gender" className="portion-button">Other</DropdownItem>
                </DropdownMenu>

              </UncontrolledDropdown>
              <br />
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {parseInt(userMeasurements.metric) ? "Metric Measurements" :
                    "Imperial Measurements"
                  }
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={userMeasurements.metric === "1"} onClick={this.metricHandler} value={1} name="metric" className="portion-button">Metric</DropdownItem>
                  <DropdownItem active={userMeasurements.metric === "0"} onClick={this.metricHandler} value={0} name="metric" className="portion-button">Imperial</DropdownItem>

                </DropdownMenu>

              </UncontrolledDropdown>
              {parseInt(userMeasurements.metric) ?

                <div>
                  <Label for="weight" className="mr-sm-2">Weight In Kilos</Label>
                  <Input type="number" name="weight" id="weight" onChange={this.handleInputChange} value={userMeasurements.weight || 0} />

                  <Label for="height" className="mr-sm-2">Height In Centimeters</Label>
                  <Input type="number" name="height" id="height" onChange={this.handleInputChange} value={userMeasurements.height || 0} />
                </div>
                : !parseInt(userMeasurements.metric) ?

                  <div>
                    <Label for="weight" className="mr-sm-2">Weight In Pounds</Label>
                    <Input type="number" name="weight" id="weight" className="weight" onChange={this.handleInputChange} value={userMeasurements.weight || 0} />
                    <Label for="height" className="mr-sm-2">Height</Label>
                    <div className="imperial-height">
                      <Input type="number" className="height" name="heightFeet" id="heightFeet" onChange={this.handleInputChange} value={userMeasurements.heightFeet || 0} />
                      <Label for="heightFeet" className="mr-sm-2, height-indicator">Feet</Label>

                      <Input type="number" name="heightInches" className="height" id="heightInches" onChange={this.handleInputChange} value={userMeasurements.heightInches || 0} />
                      <Label for="heightInches" className="mr-sm-2, height-indicator">Inches</Label>
                    </div>
                  </div>
                  :
                  <div>

                  </div>
              }


            </FormGroup>
            <br />


            <Button id="login-button" onClick={() => this.save()}> save </Button>

          </Form>
          <br />
          <div>

          </div>
        </div>

      </Jumbotron>
    );
  }
}

export default UserMeasurements;