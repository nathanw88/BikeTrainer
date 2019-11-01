import React from 'react';
import { Jumbotron, Button, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API';
import "./Food.css";
import axios from "axios";
import { exportDefaultSpecifier } from '@babel/types';
// JSON holding nutrient_id to Table Name.
import tables from "../../../JSON/NutrientTables.json";
// JSON conversion chart
import conversions from "../../../JSON/conversions.json";
// JSON holding what each nutrients regular unit of measurement is.
import regularMeasurement from "../../../JSON/regularMeasurement.json";

const APIKey = "6tWDuI4UaiW1Ho7b67OLh0VTLk3M2MixZaoFNWdG"
class Food extends React.Component {
  //state holds the log objecct that holds all the info from the form to be sent to the back end
  state = {
    input: {

      fk_user: localStorage.getItem("id"),
      date: new Date().toISOString().substr(0, 16),
      food: "",
      grams: 0,
      servingType: "",
      servings: 0

    },
    selected: {},
    choices: []
  };


  //function that grabs food data 
  selectChoice = (i) => {
    console.log(tables)
    const { input } = this.state;
    input.food = this.state.choices[i].name;
    this.setState({ input });
    this.setState({ selected: this.state.choices[i] });

    axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${this.state.choices[i].ndbno}&type=f&format=json&api_key=${APIKey}`).then((response) => {
      this.setState({ selected: response.data.foods[0].food });
      // console.log(response.data.foods[0].food.nutrients[0].measures)
      // console.log(this.state.selected.nutrients[0].measures)

    })
    this.setState({ choices: [] });
  }

  //function to send data to the backend to be stored in MySQL

  log = event => {
    let nutrientsLogged = [];
    let foodName = this.state.selected.desc.name;
    let array = [];
    this.state.selected.nutrients.map((nutrient) => {

      if (nutrientsLogged.includes(tables[nutrient.nutrient_id])) {

        nutrientsLogged.push(tables[nutrient.nutrient_id])

        if (parseFloat(nutrient.value)) {

          if (this.state.input.grams) {

            if (regularMeasurement[nutrient.nutrient_id]) {

              try {
                nutrient.value = parseFloat(nutrient.value) * (conversions[regularMeasurement[nutrient.nutrient_id]][nutrient.unit]);
                nutrient.unit = regularMeasurement[nutrient.nutrient_id];
                nutrient.value = (parseFloat(nutrient.value) * parseFloat(this.state.input.grams) / 100).toFixed(2);

                array.push([
                  tables[nutrient.nutrient_id],
                  {
                    fk_user: this.state.input.fk_user,
                    value: parseFloat(nutrient.value),
                    nutrient_id: nutrient.nutrient_id,
                    date: (this.state.input.date).substr(0, 10),
                    time: (this.state.input.date).substr(12, 16),
                    grouping: nutrient.group,
                    name: nutrient.name,
                    unit: nutrient.unit
                  }]);
              }
              catch (err) {
                nutrient.value = (parseFloat(nutrient.value) * parseFloat(this.state.input.grams) / 100).toFixed(2);
                array.push([
                  `error_log`,
                  {
                    fk_user: this.state.input.fk_user,
                    value: parseFloat(nutrient.value),
                    nutrient_id: nutrient.nutrient_id,
                    date: (this.state.input.date).substr(0, 10),
                    time: (this.state.input.date).substr(12, 16),
                    grouping: nutrient.group,
                    name: nutrient.name,
                    unit: nutrient.unit
                  }]);
              }
            }
            else if (!regularMeasurement[nutrient.nutrient_id]) {
              nutrient.value = (parseFloat(nutrient.value) * parseFloat(this.state.input.grams) / 100).toFixed(2);
              array.push([
                `error_log`,
                {
                  fk_user: this.state.input.fk_user,
                  value: parseFloat(nutrient.value),
                  nutrient_id: nutrient.nutrient_id,
                  date: (this.state.input.date).substr(0, 10),
                  time: (this.state.input.date).substr(12, 16),
                  grouping: nutrient.group,
                  name: nutrient.name,
                  unit: nutrient.unit
                }]);
            }

          }
        }
      }
    })
    API.logFood(array, foodName).then(res => {
      if (res.data.error) {
        alert(res.data.error);
      }
      else if (!res.data.error) {
        window.location.replace('/profile')
      }


    }).catch(err => console.log(err));


  }


  //function to update the state with changes to any form inputs.
  handleInputChange = event => {
    const { input } = this.state;
    //console.log(event.target)
    const { name, value } = event.target;
    //console.log(input)
    input[name] = value;
    this.setState({
      input
    });
    if (name === "food") {
      this.setState({ choices: [] });
      if (this.state.input.food) {
        var fdaAddressURL = `https://api.nal.usda.gov/ndb/search/?format=json&q=${this.state.input.food}&sort=r&max=50&offset=0&api_key=${APIKey}`;
        axios.get(fdaAddressURL).then((response) => {
          //console.log(!response.data.errors)
          if (!response.data.errors) {
            var data = response.data.list.item;

            // const choices  = this.state;
            // choices = data;
            this.setState({ choices: [...this.state.choices, ...response.data.list.item] });
          }

        })
      }
    }
  };



  render() {
    return (

      <div id="food-container">
        <Jumbotron id="food-form">
          <div>
            {/* form for logging food intake */}
            <Form autocomplete="new-password">
              <h5 className="log-heading">Food</h5>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="date" className="mr-sm-2">Date</Label>
                <Input type="datetime-local" name="date" id="date" onChange={this.handleInputChange} value={this.state.input.date} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="food" className="mr-sm-2">What you ate</Label>

                <Input type="textarea" name="food" id="food" onChange={this.handleInputChange} value={this.state.input.food} />
                {!this.state.choices == false ? <ul id="choices">
                  {this.state.choices.map((item, i) => <li className="choices" key={i} onClick={() => this.selectChoice(i)} id={i}>{item.name}</li>)}
                </ul> : <div></div>}
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="grams" className="mr-sm-2">Grams Eaten</Label>
                <Input type="number" name="grams" id="grams" onChange={this.handleInputChange} value={this.state.input.grams} />
              </FormGroup>




              <br />
              <Button id="login-button"
                disabled={
                  !(
                    this.state.input.fk_user &&
                    this.state.input.date &&
                    this.state.input.food &&
                    this.state.selected &&
                    this.state.input.grams || this.state.input.servings
                  )
                }
                onClick={() => this.log()}
              >
                Save
    </Button>

            </Form>
            <br />
            <div>

            </div>
          </div>
        </Jumbotron>
      </div>
    )
  }
}

export default Food