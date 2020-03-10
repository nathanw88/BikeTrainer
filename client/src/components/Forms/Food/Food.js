import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import API from '../../../utils/API';
import "./Food.css";

class Food extends React.Component {
  //state holds the log objecct that holds all the info from the form to be sent to the back end
  constructor(props) {
    super(props);

    this.state = {

      input: {

        userEmail: sessionStorage.getItem("email"),
        fk_user: sessionStorage.getItem("id"),
        date: new Date().toISOString().substr(0, 16),
        food: [],
        grams: [],
        selected: [],
        portions: []
      },
      index: 0,   
      choices: [],
      showGrams: true
    };
  };

  showCustomPortion = () => {
    this.setState({ showGrams: false })
  }

  portionChoice = (grams) => {
    const { input } = this.state;
    input.grams[this.state.index] = grams;
    this.setState({ input });
    this.setState({ showGrams: false })
    console.log(this.state.input.grams)
  }

  //function that grabs food data 
  selectChoice = (i) => {
    console.log(this.state.choices[i])
    const { input } = this.state;
    input.food[this.state.index] = `${this.state.choices[i].description} ${this.state.choices[i].additional_descriptions ? this.state.choices[i].additional_descriptions : ""} ${this.state.choices[i].brand ? this.state.choices[i].brand : ""}`;
    input.selected[this.state.index] = this.state.choices[i]
    this.setState({ input });

    API.selectPortions(this.state.choices[i].id).then(res => {
      const { input } = this.state;
      input.portions[this.state.index] = [...res.data]
      this.setState({
        input
      })
    });

    this.setState({ choices: [] });

  }

  //function to send data to the backend to be stored in MySQL

  log = event => {
    let fkFoodArray = []
    this.state.input.selected.map(item => fkFoodArray.push(item.id))
    // console.log(this.state.selected)
    let data = {
      userEmail: this.state.input.userEmail,
      fk_user: this.state.input.fk_user,
      grams: this.state.input.grams,
      fk_food: fkFoodArray,
      date: (this.state.input.date.replace("T", " "))
    };
    
    API.logFood(data).then(res => {
      if (res.data.error) {
        alert(res.data.error);
      }
      else if (!res.data.error) {
        window.location.replace('/profile')
      }


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
      input[name][this.state.index] = parseFloat(value);
      this.setState({
        input
      });

    }
   
    else if (name === "food") {
      console.log(input)
      if (input.food[0]) {
        input.food = input.food.map((item, i) => {
          if (i === this.state.index) {
            return value
          }
          else
            return item

        });
      }
      else {
        input[name][this.state.index] = value;
      }

      this.setState({
        input
      });
      this.timer = setTimeout(this.grabFood, 750);
    }
    else {
      input[name] = value;
      this.setState({
        input
      });
    }

  }
  //function to update the state with changes to any form inputs.
  grabFood = () => {



    this.setState({ choices: [] });
    if (this.state.input.food[this.state.index] && this.state.input.food[this.state.index].length >= 3) {
      API.findFood(this.state.input.food[this.state.index], this.state.input.fk_user).then(res => {
        console.log(res);
        if(res.data.error){
          alert(res.data.error)
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "")

          window.location.replace('/')
        }
        else{
        this.setState({ choices: [...this.state.choices, ...res.data] });
        }
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
              <h5 className="log-heading">Food</h5>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="date" className="mr-sm-2">Date</Label>
                <Input type="datetime-local" name="date" id="date" onChange={this.handleInputChange} value={this.state.input.date} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="food" className="mr-sm-2">What you ate</Label>

                <Input type="textarea" name="food" id="food" onChange={this.handleInputChange} value={this.state.input.food[this.state.index]} />
                {!this.state.choices == false ? <ul id="choices">
                  {this.state.choices.map((item, i) => <li className="choices" key={i} onClick={() => this.selectChoice(i)} id={i}>{item.description} {item.brand} {item.additional_descriptions}</li>)}
                </ul> : <div></div>}
              </FormGroup>
              <FormGroup hidden={this.state.showGrams} className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="grams" className="mr-sm-2">Grams Eaten</Label>
                <Input type="number" name="grams" id="grams" onChange={this.handleInputChange} value={this.state.input.grams[this.state.index]} />
              </FormGroup>
              <br />
              {!this.state.input.portions[this.state.index] == false ?
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    Portion
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.showCustomPortion} className="portion-button">Custom Weight</DropdownItem>
                    {this.state.input.portions[this.state.index].map((portion, i) =>
                      portion.amount ? <DropdownItem key={i} onClick={() => this.portionChoice(portion.gram_weight)} className="portion-button">{portion.amount} {portion.description} {portion.gram_weight} Grams</DropdownItem>
                        : <DropdownItem key={i} onClick={() => this.portionChoice(portion.gram_weight)} className="portion-button">{portion.description} {portion.gram_weight} Grams</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
                : <div></div>
              }
              <br />
              <Button id="login-button"
                disabled={
                  !(
                    this.state.input.fk_user &&
                    this.state.input.date &&
                    this.state.input.food &&
                    this.state.input.selected &&
                    this.state.input.grams
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