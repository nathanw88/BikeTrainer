import React from 'react';
import { Jumbotron, Button, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API'
import "./Food.css"

class Sleeping extends React.Component {
  state={
    log:{
      fk_user: localStorage.getItem("id"),
      carbs: "",
      fats: "",
      proteins: "",
      date: ""
    }
  }
  log = event=>{
    console.log(localStorage.getItem("id"))
    API.logFood([Object.keys(this.state.log)],[Object.values(this.state.log)]).then(res => {
      if(res.data.error){
        alert(res.data.error)
      }
      else if(!res.data.error){
        window.location.replace('/profile')
      }
      

    }).catch(err => console.log(err));
    
  }

handleInputChange = event => {
  const { log } = this.state
  console.log(event.target)
  const { name, value } = event.target;
  console.log(log)
  log[name] = value
  this.setState({
   log
  });
};

  render(){
    return(

    
<Jumbotron id="food-form">
<div>
    <Form>
      <FormText>Date is required.</FormText>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="carbs" className="mr-sm-2">Grams of carbs.</Label>
    <Input type="number" name="carbs" id="carbs" onChange={this.handleInputChange} value={this.state.log.carbs}  />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="fats" className="mr-sm-2">Grams of fats.</Label>
    <Input type="number" name="fats" id="fats" onChange={this.handleInputChange} value={this.state.log.fats}/>
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="proteins" className="mr-sm-2">Grams of protein.</Label>
    <Input type="number" name="proteins" id="proteins" onChange={this.handleInputChange} value={this.state.log.proteins} />
  </FormGroup>
 <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="date" className="mr-sm-2">Date</Label>
    <Input type="datetime-local" name="date" id="date" onChange={this.handleInputChange} value={this.state.log.date} />
  </FormGroup>
  <Button id="login-button"
      disabled={
        !(
          this.state.log.fk_user &&
          this.state.log.date
        )
      }
      onClick={() =>this.log()}
    >
       Save
    </Button>
 
</Form>
      <br />
      <div>

</div>
</div>
</Jumbotron>)
  }
    }

    export default Sleeping