import React from 'react';
import { Jumbotron, Button, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API'
import "./Running.css"

class Running extends React.Component {
  state={
    log:{
      fk_user: localStorage.getItem("id"),
      difficulty: "", 
      distance_miles: "",
      duration_minutes: "",
      avg_heartbeat: "",
      max_heartbeat: "",
      workout_type: "Interval",
      avg_mph: "",
      date: ""
    }
  }
  log = event=>{
    API.logRun([Object.keys(this.state.log)],[Object.values(this.state.log)]).then(res => {
      if(res.data.error){
        alert(res.data.error)
      }
      else if(!res.data.error){
        window.location.replace('/profile')
      }
      

    })
    
  }

handleInputChange = event => {
  const { log } = this.state
  const { name, value } = event.target;
  log[name] = value
  this.setState({
   log
  });
};

  render(){
    return(

<div id="running-container">
<Jumbotron id="run-form">
<div>
    <Form>
      <h5 className="log-heading">Running</h5>
      <FormText>Miles, Minutes, and Date are required.</FormText>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="difficulty" className="mr-sm-2">Difficulty</Label>
    <Input type="number" min="1" max="10" name="difficulty" id="difficulty" onChange={this.handleInputChange} value={this.state.log.difficulty} placeholder="Number between 1 and 10" />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="distanceMiles" className="mr-sm-2">Miles</Label>
    <Input type="number" name="distance_miles" id="distance_miles" onChange={this.handleInputChange} value={this.state.log.distance_miles} placeholder="Miles you ran" />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="durationMinutes" className="mr-sm-2">Minutes</Label>
    <Input type="number" name="duration_minutes" id="duration_minutes" onChange={this.handleInputChange} value={this.state.log.duration_minutes} placeholder="Enter duration in minutes" />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="avgHeartbeat" className="mr-sm-2">Average Heartbeat</Label>
    <Input type="number" name="avg_heartbeat" id="avg_heartbeat" onChange={this.handleInputChange} value={this.state.log.avg_heartbeat} placeholder="Enter average heartbeat" />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="maxHeartbeat" className="mr-sm-2">Max Heartbeat</Label>
    <Input type="number" name="max_heartbeat" id="max_heartbeat" onChange={this.handleInputChange} value={this.state.log.max_heartbet} placeholder="Enter max heartbeat" />
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="workoutType" className="mr-sm-2">Workout type</Label>
    <Input type="select" name="workout_type" id="workout_type" onChange={this.handleInputChange} value={this.state.log.workout_type} >
      <option>Interval</option>
      <option>Endurance</option>
      <option>Hill Sprints</option>
      <option>Other</option>
    </Input>
  </FormGroup>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="mph" className="mr-sm-2">Speed in MPH</Label>
    <Input type="number" name="avg_mph" id="avg_mph" onChange={this.handleInputChange} value={this.state.log.avg_mph} placeholder="Your average MPH goes here" />
  </FormGroup>  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="date" className="mr-sm-2">Date</Label>
    <Input type="datetime-local" name="date" id="date" onChange={this.handleInputChange} value={this.state.log.date} placeholder="Date and time of the ride" />
  </FormGroup>
  <br/>
  <Button id="login-button"
      disabled={
        !(
          this.state.log.distance_miles &&
          this.state.log.duration_minutes &&
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
</Jumbotron>
</div>
)
  }
    }

    export default Running