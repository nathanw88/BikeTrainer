import React, { Component } from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import API from '../../utils/API';
// import Food from "../../components/Forms/Food/Food"
import "./Log.css"

class Log extends Component {

  //state holds the log objecct that holds all the info from the form to be sent to the back end
  constructor(props) {

    super(props);

    this.state = {

      input: {

        date: new Date().toISOString().substr(0, 16),
        food: "",
        grams: 0,
        selected: {},
        portions: []

      },

      log: {

        fk_user: sessionStorage.getItem("id"),
        portions: [],
        date: [],
        food: [],
        grams: [],
        fk_food: [],
        selected: []

      },

      choices: [],
      hideGrams: true

    };
  };

  showCustomPortion = () => {

    this.setState({ hideGrams: false })

  }

  portionChoice = (grams) => {

    const { input } = this.state;
    input.grams = grams;
    this.setState({ input });
    this.setState({ hideGrams: false })
    // console.log(this.state.input.grams)

  }

  //function that grabs food data 
  selectChoice = (i) => {

    // console.log(this.state.choices[i])
    const { input } = this.state;
    input.food = `${this.state.choices[i].description} ${this.state.choices[i].additional_descriptions ? this.state.choices[i].additional_descriptions : ""} ${this.state.choices[i].brand ? this.state.choices[i].brand : ""}`;
    input.selected = this.state.choices[i]
    this.setState({ input });

    API.selectPortions(this.state.choices[i].id).then(res => {

      const { input } = this.state;
      input.portions = [...res.data]
      this.setState({ input })

    });

    this.setState({ choices: [] });

  }

  //function to send data to the backend to be stored in MySQL

  log = event => {


    // console.log(this.state.selected)
    let data = {

      fk_user: this.state.log.fk_user,
      grams: this.state.log.grams,
      fk_food: this.state.log.fk_food,
      date: (this.state.input.date.replace("T", " "))

    };

    API.logFood(data).then(res => {

      if (res.data.error) {

        alert(res.data.error)
        if (res.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(res.data.redirect);
        }

      }

      else if (!res.data.error) { window.location.replace('/profile'); };


    }).catch(err => console.log(err));


  }

  componentWillMount() {

    this.timer = null;

  }

  handleInputChange = (event) => {

    clearTimeout(this.timer);
    const { input } = this.state;
    // console.log(event.target)
    const { name, value } = event.target;
    //console.log(input)

    if (name === "grams") {

      input[name] = parseFloat(value);
      this.setState({ input });

    }

    else if (name === "food") {

      // console.log(input)
      input.food = value
      this.setState({ input });
      this.timer = setTimeout(this.grabFood, 300);

    }

    else {

      input[name] = value;
      this.setState({ input });

    };
  };
  moveData = () => {
    const { log } = this.state,
      { input } = this.state;
    log.grams = log.grams.concat(input.grams);
    log.food = log.food.concat(input.food);
    log.fk_food = log.fk_food.concat(input.selected.id);
    log.date = log.date.concat(input.date);
    log.portions = log.portions.concat([input.portions]);
    log.selected = log.selected.concat(input.selected);
    input.grams = 0;
    input.food = "";
    input.date = new Date().toISOString().substr(0, 16);
    input.portions = [];
    input.selected = {};

    this.setState({

      input,
      log,
      hideGrams: true

    });
    // console.log(this.state);

  }
  removeIndex = (array, i) => {
    array.splice(i, 1);

    return array
  };

  deleteLog = (i) => {

    const { log } = this.state;
    log.date = this.removeIndex(log.date, i);
    log.fk_food = this.removeIndex(log.fk_food, i);
    log.food = this.removeIndex(log.food, i);
    log.grams = this.removeIndex(log.grams, i);
    log.portions = this.removeIndex(log.portions, i);
    log.selected = this.removeIndex(log.selected, i);


    this.setState({

      log

    });



  }

  editLog = (i) => {

    const { input } = this.state;
    const { log } = this.state;
    input.date = log.date[i];
    input.food = log.food[i];
    input.grams = log.grams[i];
    input.selected = log.selected[i];
    input.portions = log.portions[i];
    log.date = this.removeIndex(log.date, i);
    log.fk_food = this.removeIndex(log.fk_food, i);
    log.food = this.removeIndex(log.food, i);
    log.grams = this.removeIndex(log.grams, i);
    log.portions = this.removeIndex(log.portions, i);
    log.selected = this.removeIndex(log.selected, i);

    console.log(input);
    console.log(log);
    this.setState({

      log,
      input

    });

  }

  grabFood = () => {

    this.setState({ choices: [] });
    if (this.state.input.food && this.state.input.food.length >= 3) {

      API.findFood(this.state.input.food, this.state.log.fk_user).then(res => {

        // console.log(res);
        if (res.data.error) {

          alert(res.data.error)
          if (res.data.error === "Your session has expired.") {
            sessionStorage.setItem("email", "");
            sessionStorage.setItem("id", "");
            window.location.replace(res.data.redirect);
          }

        }
        else { this.setState({ choices: [...this.state.choices, ...res.data] }); };

      });
    }
  };



  render() {
    return (

      <div id="food-container">
        <Jumbotron id="food-form">
          <div>
            {/* form for logging food intake */}
            <Form>
              <h3 className="log-heading">Food</h3>

              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                <Label for="date" className="mr-sm-2">Date</Label>
                <Input type="datetime-local" name="date" id="date" onChange={this.handleInputChange} value={this.state.input.date} />

              </FormGroup>

              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                <Label for="food" className="mr-sm-2">What you ate</Label>
                <Input type="textarea" name="food" id="food" onChange={this.handleInputChange} value={this.state.input.food} />
                {!this.state.choices == false ? <ul id="choices">
                  {this.state.choices.map((item, i) => <li className="choices" key={i} onClick={() => this.selectChoice(i)} id={i}>{item.description} {item.brand} {item.additional_descriptions}</li>)}
                </ul> : <div></div>}

              </FormGroup>

              <FormGroup hidden={this.state.hideGrams} className="mb-2 mr-sm-2 mb-sm-0">

                <Label for="grams" className="mr-sm-2">Grams Eaten</Label>
                <Input type="number" name="grams" id="grams" onChange={this.handleInputChange} value={this.state.input.grams} />

              </FormGroup>

              <br />
              {!this.state.input.portions == false ?
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    Portion
              </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.showCustomPortion} className="portion-button">Custom Weight</DropdownItem>
                    {this.state.input.portions.map((portion, i) =>
                      portion.amount ? <DropdownItem key={i} onClick={() => this.portionChoice(portion.gram_weight)} className="portion-button">{portion.amount} {portion.description} {portion.gram_weight} Grams</DropdownItem>
                        : <DropdownItem key={i} onClick={() => this.portionChoice(portion.gram_weight)} className="portion-button">{portion.description} {portion.gram_weight} Grams</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
                : <div></div>
              }
              <br />
              <Button id="login-button"

                disabled={!(
                  this.state.log.fk_user &&
                  this.state.input.date &&
                  this.state.input.food &&
                  this.state.input.selected &&
                  this.state.input.grams
                )} onClick={() => this.moveData()}>
                Add To Be Logged

              </Button>

            </Form>
            <br />
            <div>

            </div>
          </div>
        </Jumbotron>

        {!this.state.log.fk_food == false ?

          <Jumbotron id="logs-container">
            <Jumbotron id="logs">{


              this.state.log.fk_food.map((fkFood, i) => <div key={i}>

                {this.state.log.selected[i].brand ? <h4>{this.state.log.selected[i].brand}&copy;</h4> : <div></div>}
                <h6>  {this.state.log.selected[i].description}</h6>
                <p>{this.state.log.selected[i].additional_descriptions}</p>
                <p><b>Grams:</b> {this.state.log.grams[i]}</p>
                <p><b>Date:</b> {this.state.log.date[i].replace("T", " ")}</p>
                <br></br>
                <p><Button id="log-delete" onClick={() => this.deleteLog(i)}>Delete</Button>
                  <Button id="log-edit" onClick={() => this.editLog(i)}>Edit</Button></p>

                <br></br>

              </div>
              )}
            </Jumbotron>
            <Button id="login-button" onClick={() => this.log()}> Log Data </Button>
          </Jumbotron>
          :
          <div></div>

        }

      </div>


    )
  }
}

export default Log;