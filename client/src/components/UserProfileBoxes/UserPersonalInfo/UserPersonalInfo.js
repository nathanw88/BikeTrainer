import React, { Component } from "react";
import { Jumbotron, Label, Input, Button, Form, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, FormGroup } from 'reactstrap';
import API from '../../../utils/API';
import "./UserPersonalInfo.css";

class UserPersonalInfo extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: sessionStorage.getItem("id"),
      userPersonalInfo: {}

    };
  };

  componentDidMount = () => {
    let poundsToKilograms = 2.2046;
    if (!sessionStorage.getItem("id")) {
      alert("Please Login")
      window.location.replace("/")
    };

    API.getUserPersonalInfo(this.state.userID).then((result) => {
      if (result.data.error) {

        alert(result.data.error)
        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }

      }
      else {
        const { userPersonalInfo } = this.state;
        let values = Object.values(result.data);
        let keys = Object.keys(result.data);
        let length = keys.length;

        for (let i = 0; i < length; i++) {
          userPersonalInfo[keys[i]] = values[i]
        };
        if (!userPersonalInfo.metric) {
          userPersonalInfo.weight = Math.round(userPersonalInfo.weight * poundsToKilograms);
          userPersonalInfo.heightFeet = parseInt((userPersonalInfo.height / 2.54) / 12)
          userPersonalInfo.heightInches = parseInt((userPersonalInfo.height / 2.54) % 12)

        }
        console.log(userPersonalInfo);
        this.setState({ userPersonalInfo });
      }
    });
  };


  handleInputChange = event => {

    const { userPersonalInfo } = this.state;
    // console.log(event.target)
    const { name, value } = event.target;
    //console.log(userPersonalInfo)
    userPersonalInfo[name] = value;
    this.setState({ userPersonalInfo });

  };

  save = () => {
    let inchToCentimeter = 2.54;
    let feetToInches = 12;
    let poundsToKilograms = 2.2046;
    let data = {
      gender: this.state.userPersonalInfo.gender,
      userID: sessionStorage.getItem("id"),
      weight: 0,
      height: 0,
      metric: parseInt(this.state.userPersonalInfo.metric)
    };

    if (data.metric) {
      data.weight = this.state.userPersonalInfo.weight;
      data.height = this.state.userPersonalInfo.height;
    }
    else if (!data.metric) {
      data.weight = parseFloat((parseFloat(this.state.userPersonalInfo.weight) / poundsToKilograms).toFixed(3));
      data.height = (this.state.userPersonalInfo.heightFeet * feetToInches + parseFloat(this.state.userPersonalInfo.heightInches)) * inchToCentimeter;
    }
    // console.log(data);
    // console.log(this.state.userPersonalInfo);

    API.saveSetup(data).then((result) => {
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

  clickHandler = event => {

    const { userPersonalInfo } = this.state;
    const { name, value } = event.target;
    console.log(value)
    userPersonalInfo[name] = value;
    this.setState({ userPersonalInfo });
    console.log(this.state.userPersonalInfo.metric)

  };

  metricHandler = event => {
    let poundsToKilograms = 2.2046;
    const { userPersonalInfo } = this.state;
    const { value } = event.target;
    console.log(userPersonalInfo.metric)
    if (parseInt(value) !== parseInt(userPersonalInfo.metric)) {
      if (parseInt(value)) {
        console.log("KG")
        userPersonalInfo.weight = parseFloat((parseFloat(userPersonalInfo.weight) / poundsToKilograms).toFixed(3));
      }
      else if (!parseInt(value)) {
        console.log("pounds")
        userPersonalInfo.weight = parseFloat((parseFloat(userPersonalInfo.weight) * parseFloat(poundsToKilograms)).toFixed(1));
      }
      userPersonalInfo.metric = parseInt(value);
      this.setState({ userPersonalInfo });
    }

  }



  render() {
    const { userPersonalInfo } = this.state;

    return (

      <Jumbotron id="UserPersonalInfo-box" className="profile-box">
        <h2 className="text-center">Measurements</h2>
        <div>
          <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {userPersonalInfo.gender}
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={userPersonalInfo.gender === "male"} onClick={this.clickHandler} value="male" name="gender" className="portion-button"> Male </DropdownItem>
                  <DropdownItem active={userPersonalInfo.gender === "female"} onClick={this.clickHandler} value="female" name="gender" className="portion-button"> Female</DropdownItem>
                  <DropdownItem active={userPersonalInfo.gender === "other"} onClick={this.clickHandler} value="other" name="gender" className="portion-button">Other</DropdownItem>
                </DropdownMenu>

              </UncontrolledDropdown>
              <br />
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {parseInt(userPersonalInfo.metric) ? "Metric Measurements" :
                    "Imperial Measurements"
                  }
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={userPersonalInfo.metric === "1"} onClick={this.metricHandler} value={1} name="metric" className="portion-button">Metric</DropdownItem>
                  <DropdownItem active={userPersonalInfo.metric === "0"} onClick={this.metricHandler} value={0} name="metric" className="portion-button">Imperial</DropdownItem>

                </DropdownMenu>

              </UncontrolledDropdown>
              {parseInt(userPersonalInfo.metric) ?

                <div>
                  <Label for="weight" className="mr-sm-2">Weight In Kilos</Label>
                  <Input type="number" name="weight" id="weight" onChange={this.handleInputChange} value={userPersonalInfo.weight||0} />

                  <Label for="height" className="mr-sm-2">Height In Centimeters</Label>
                  <Input type="number" name="height" id="height" onChange={this.handleInputChange} value={userPersonalInfo.height||0} />
                </div>
                : !parseInt(userPersonalInfo.metric) ?

                  <div>
                    <Label for="weight" className="mr-sm-2">Weight In Pounds</Label>
                    <Input type="number" name="weight" id="weight" className="weight" onChange={this.handleInputChange} value={userPersonalInfo.weight||0} />
                    <Label for="height" className="mr-sm-2">Height</Label>
                    <div className="imperial-height">
                      <Input type="number" className="height" name="heightFeet" id="heightFeet" onChange={this.handleInputChange} value={userPersonalInfo.heightFeet||0} />
                      <Label for="heightFeet" className="mr-sm-2, height-indicator">Feet</Label>

                      <Input type="number" name="heightInches" className="height" id="heightInches" onChange={this.handleInputChange} value={userPersonalInfo.heightInches||0} />
                      <Label for="heightInches" className="mr-sm-2, height-indicator">Inches</Label>
                    </div>
                  </div>
                  :
                  <div>

                  </div>
              }


            </FormGroup>
            <br />


            <Button id="login-button"

              onClick={() => this.save()}>
              save

              </Button>

          </Form>
          <br />
          <div>

          </div>
        </div>

      </Jumbotron>
    );
  }
}

export default UserPersonalInfo;