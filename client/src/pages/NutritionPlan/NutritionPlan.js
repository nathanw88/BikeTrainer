import React, { Component } from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import API from '../../utils/API';
import "./NutritionPlan.css"

class NutritionPlan extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: parseInt(sessionStorage.getItem("id")),
      user: {},
      input: {
        name: "",
        description: "",
        exerciseAmount: "Amount Of Exercise",
        diet: {
          calories: {
            id: 1008,
            amount: 2000
          },
          fats: {
            id: 1004,
            amount: 44
          },
          carbs: {
            id: 1005,
            amount: 250,
          },
          protein: {
            id: 1003,
            amount: 150
          }
        }
      },
      percentSliders: {
        carbs: 50,
        fats: 20,
        protein: 30,
      },
      midPointSliders: {
        calories: 2000
      }

    };
  };

  componentDidMount = () => {
    if (!sessionStorage.getItem("id")) {
      alert("Please Login")
      window.location.replace("/")
    };

    API.getUserMeasurements(this.state.userID).then((result) => {
        const { user } = this.state;
        let values = Object.values(result.data), keys = Object.keys(result.data), length = keys.length;
        console.log(user)
        for (let i = 0; i < length; i++) {
          user[keys[i]] = values[i]
        };
        this.setState({ user });

      
    }).catch(error =>{
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  };

  midPointCheck = (event, name) => {
    const { midPointSliders } = this.state;
    const { value } = event.target;

    if (midPointSliders[name] + 400 <= value || midPointSliders[name] - 400 >= value) {
      midPointSliders[name] = value;
    }

    this.setState({ midPointSliders });

  }

  handleInputChange = event => {
    const { input } = this.state;
    const { name, value } = event.target;
    input[name] = value;

    this.setState({ input });

  };

  changeValue = (event, name) => {
    const { diet } = this.state.input;
    const { percentSliders } = this.state;
    const { value } = event.target;
    diet[name].amount = value;

    if (name === "calories") {
      diet.carbs.amount = parseInt(diet.calories.amount * (percentSliders.carbs / 100) / 4);
      diet.protein.amount = parseInt(diet.calories.amount * (percentSliders.protein / 100) / 4);
      diet.fats.amount = parseInt(diet.calories.amount * (percentSliders.fats / 100) / 9);
    }

    this.setState({
      diet
    });

  }

  changePercentValue = (event, name) => {
    const { diet } = this.state.input, { percentSliders } = this.state, { value } = event.target, percentChanged = percentSliders[name] - value, namesUnchangedArray = Object.keys(this.state.percentSliders);
    percentSliders[name] = value;
    namesUnchangedArray.splice(namesUnchangedArray.indexOf(name), 1);

    percentSliders[namesUnchangedArray[0]] += percentChanged / 2;
    percentSliders[namesUnchangedArray[1]] += percentChanged / 2;

    if (percentSliders[namesUnchangedArray[0]] < 0) {

      percentSliders[namesUnchangedArray[1]] += percentSliders[namesUnchangedArray[0]];
      percentSliders[namesUnchangedArray[0]] = 0;
    }
    else if (percentSliders[namesUnchangedArray[1]] < 0) {

      percentSliders[namesUnchangedArray[0]] += percentSliders[namesUnchangedArray[1]];
      percentSliders[namesUnchangedArray[1]] = 0;
    }

    diet.carbs.amount = parseInt(diet.calories.amount * (percentSliders.carbs / 100) / 4);
    diet.protein.amount = parseInt(diet.calories.amount * (percentSliders.protein / 100) / 4);
    diet.fats.amount = parseInt(diet.calories.amount * (percentSliders.fats / 100) / 9);

    this.setState({
      diet,
      percentSliders
    })

  }

  clickHandler = event => {
    const { input } = this.state, { name, value } = event.target;

    if (name === "exerciseAmount") {
      const { midPointSliders } = this.state;
      const { user } = this.state;
      const { diet } = this.state.input;
      const birthday = new Date(user.userBirthday);
      const age = ((Date.now() - birthday) / (31557600000));
      const exerciseMultiplier = {
        "Limited Exercise": 1.25,
        "Light Exercise": 1.375,
        "Moderate Exercise": 1.55,
        "Hardcore Exercise": 1.725
      }

      if (user.gender === "male") {
        diet.calories.amount = parseInt((10 * user.weight + 6.25 * user.height - 5 * age + 5) * exerciseMultiplier[value]);
        diet.carbs.amount = parseInt(diet.calories.amount * .5 / 4);
        diet.protein.amount = parseInt(diet.calories.amount * .3 / 4);
        diet.fats.amount = parseInt(diet.calories.amount * .2 / 9);
      }

      else if (user.gender === "female") {
        diet.calories.amount = parseInt((10 * user.weight + 6.25 * user.height - 5 * age - 161)) * exerciseMultiplier[value];
        diet.carbs.amount = parseInt(diet.calories.amount * .5 / 4);
        diet.protein.amount = parseInt(diet.calories.amount * .3 / 4);
        diet.fats.amount = parseInt(diet.calories.amount * .2 / 9);
      }

      midPointSliders.calories = diet.calories.amount;

      this.setState({
        diet,
        midPointSliders
      });

    };
    input[name] = value;
    this.setState({ input });
  };

  save = () => {
    const { input } = this.state;
    let data = {
      id: this.state.userID,
      nutritionPlanData: {
        name: input.name,
        description: input.description,
        exercise_amount: input.exerciseAmount
      },
      nutritionPlanNutrients: input.diet
    }

    API.saveNutritionPlan(data).then((result) => {
      window.location.replace("/log");
    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  }

  render() {

    return (<div id="nutrition_plan_container">

      <Jumbotron id="nutrition_plan_form">
        <div>
          {/* form for logging food intake */}
          <Form>
            <h3 className="log-heading">New Nutrition Plan</h3>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

              <Label for="food" className="mr-sm-2">Name For Nutrition Plan</Label>
              <Input type="text" name="name" id="name" onChange={this.handleInputChange} value={this.state.input.name} />

              <Label for="description" className="mr-sm-2">Description</Label>
              <Input type="textarea" name="description" id="description" onChange={this.handleInputChange} value={this.state.input.description} />

              <br />


              <Label for="exerciseAmount" className="mr-sm-2">Select Current Amount Of Exercise</Label>
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {this.state.input.exerciseAmount}
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem active={this.state.input.exerciseAmount === "Limited Exercise"} onClick={this.clickHandler} value="Limited Exercise" name="exerciseAmount" className="portion-button"> Limited Exercise ('Desk job with little to no exercise.')</DropdownItem>
                  <DropdownItem active={this.state.input.exerciseAmount === "Light Exercise"} onClick={this.clickHandler} value="Light Exercise" name="exerciseAmount" className="portion-button"> Light Exercise ('Exercise less then three tmes a week.')</DropdownItem>
                  <DropdownItem active={this.state.input.exerciseAmount === "Moderate Exercise"} onClick={this.clickHandler} value="Moderate Exercise" name="exerciseAmount" className="portion-button"> Moderate Exercise ('Exercise most days of the week.')</DropdownItem>
                  <DropdownItem active={this.state.input.exerciseAmount === "Hardcore Exercise"} onClick={this.clickHandler} value="Hardcore Exercise" name="exerciseAmount" className="portion-button"> Hardcore Exercise ('Exercise seven times a week.')</DropdownItem>
                </DropdownMenu>

              </UncontrolledDropdown>
              <br />

              <Label for="calorieSlider" className="mr-sm-2">Calories: {this.state.input.diet.calories.amount}</Label>
              <br />
              <ReactBootstrapSlider
                value={this.state.input.diet.calories.amount}
                slideStop={(event) => {
                  this.midPointCheck(event, "calories");
                  this.changeValue(event, "calories");
                }}
                step={1}
                max={this.state.midPointSliders.calories + 500}
                min={this.state.midPointSliders.calories - 500} />
              <br />
              <Label for="carbSlider" className="mr-sm-2">Carbohydrates Grams: {this.state.input.diet.carbs.amount}</Label>
              <br />
              <ReactBootstrapSlider
                value={this.state.percentSliders.carbs}
                slideStop={(event) => {
                  this.changePercentValue(event, "carbs");
                }}
                step={1}
                max={100}
                min={0} />
              <br />
              <Label for="fatSlider" className="mr-sm-2">Fats Grams: {this.state.input.diet.fats.amount}</Label>
              <br />
              <ReactBootstrapSlider
                value={this.state.percentSliders.fats}
                slideStop={(event) => {
                  this.changePercentValue(event, "fats");
                }}
                step={1}
                max={100}
                min={0} />
              <br />
              <Label for="proteinSlider" className="mr-sm-2">Protein Grams: {this.state.input.diet.protein.amount}</Label>
              <br />
              <ReactBootstrapSlider
                value={this.state.percentSliders.protein}
                slideStop={(event) => {

                  this.changePercentValue(event, "protein");
                }}
                step={1}
                max={100}
                min={0} />
            </FormGroup>

            <br />


            <Button id="login-button"

              disabled={false} onClick={() => this.save()}>
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

export default NutritionPlan;