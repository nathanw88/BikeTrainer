import React, { Component } from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import API from '../../utils/API';
import "./Setup.css"

class Setup extends Component {

  constructor(props) {

    super(props);

    this.state = {
      input: {
        gender: "Select Gender",
        weight: 0,
        height: 0,
        heightFeet: 0,
        heightInches: 0,
        metric: 0
      }
    };
  };

  handleInputChange = event => {

    const { input } = this.state;
    // console.log(event.target)
    const { name, value } = event.target;
    //console.log(input)
    input[name] = value;
    this.setState({ input });

  };

  save = () => {
    let inchToCentimeter = 2.54;
    let feetToInches = 12;
    let poundsToKilograms = 2.2046;
    let data = {
      gender: this.state.input.gender,
      userID: sessionStorage.getItem("id"),
      weight: 0,
      height: 0,
      metric: parseInt(this.state.input.metric)
    };

    if (data.metric) {
      data.weight = this.state.input.weight;
      data.height = this.state.input.height;
    }
    else if (!data.metric) {
      data.weight = parseFloat((parseFloat(this.state.input.weight) / poundsToKilograms).toFixed(3));
      data.height = (this.state.input.heightFeet * feetToInches + parseFloat(this.state.input.heightInches)) * inchToCentimeter;
    }
    // console.log(data);
    // console.log(this.state.input);

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
        window.location.replace("/nutrition_plan")
        // console.log(result);
      }
    });
  };

  clickHandler = event => {

    const { input } = this.state;
    const { name, value } = event.target;
    console.log(value)
    input[name] = value;
    this.setState({ input });
    console.log(this.state.input.metric)

  };

  render() {

    return (<div id="Setup_container">

      <Jumbotron id="Setup_form">
        <div>
          <Form>
            <h3 className="log-heading">Setup Profile</h3>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {this.state.input.gender}
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={this.state.input.gender === "male"} onClick={this.clickHandler} value="male" name="gender" className="portion-button"> Male </DropdownItem>
                  <DropdownItem active={this.state.input.gender === "female"} onClick={this.clickHandler} value="female" name="gender" className="portion-button"> Female</DropdownItem>
                  <DropdownItem active={this.state.input.gender === "other"} onClick={this.clickHandler} value="other" name="gender" className="portion-button">Other</DropdownItem>
                </DropdownMenu>

              </UncontrolledDropdown>

              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {parseInt(this.state.input.metric) ? "Metric Measurements" :
                    "Imperial Measurements"
                  }
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={this.state.input.metric === "1"} onClick={this.clickHandler} value={1} name="metric" className="portion-button">Metric</DropdownItem>
                  <DropdownItem active={this.state.input.metric === "0"} onClick={this.clickHandler} value={0} name="metric" className="portion-button">Imperial</DropdownItem>

                </DropdownMenu>

              </UncontrolledDropdown>
              {parseInt(this.state.input.metric) ?

                <div>
                  <Label for="weight" className="mr-sm-2">Weight In Kilos</Label>
                  <Input type="number" name="weight" id="weight" onChange={this.handleInputChange} value={this.state.input.weight} />

                  <Label for="height" className="mr-sm-2">Height In Centimeters</Label>
                  <Input type="number" name="height" id="height" onChange={this.handleInputChange} value={this.state.input.height} />
                </div>
                : !parseInt(this.state.input.metric) ?

                  <div>
                    <Label for="weight" className="mr-sm-2">Weight In Pounds</Label>
                    <Input type="number" name="weight" id="weight" onChange={this.handleInputChange} value={this.state.input.weight} />
                    <Label for="height" className="mr-sm-2">Height</Label>
                    <div className="imperial-height">
                      <Input type="number" className="height" name="heightFeet" id="heightFeet" onChange={this.handleInputChange} value={this.state.input.heightFeet} />
                      <Label for="heightFeet" className="mr-sm-2, height-indicator">Feet</Label>

                      <Input type="number" name="heightInches" className="height" id="heightInches" onChange={this.handleInputChange} value={this.state.input.heightInches} />
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
    </div>);
  }
}

export default Setup;