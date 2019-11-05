import React from 'react';
import { Jumbotron, Button, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import API from '../../../utils/API'
import "./Sleeping.css"

class Sleeping extends React.Component {
  //setting state with user id and setting it up to hold the log data
  state = {
    log: {
      fk_user: localStorage.getItem("id"),
      laid_down: "",
      asleep: "",
      got_up: "",
      awake: "",
      waking_heartbeat: "",
      date: ""
    }
  }
  // where the data is sent to api.js file in utils folder to be sent to the backend
  log = event => {

    API.logSleep([Object.keys(this.state.log)], [Object.values(this.state.log)]).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      }
      else if (!res.data.error) {
        window.location.replace('/profile')
      }


    }).catch(err => console.log(err));

  }

  // handles changes to the sleeping form set state to current changes 
  handleInputChange = event => {
    const { log } = this.state

    const { name, value } = event.target;

    log[name] = value
    this.setState({
      log
    });
  };

  render() {
    return (

      <div id="sleep-container">
        <Jumbotron id="sleep-form">
          <div>
            {/* form for collecting sleep logs */}
            <Form>
              <h5 className="log-heading">Sleeping</h5>
              <FormText>Laid down time, Got up time, and Date are required.</FormText>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="laidDown" className="mr-sm-2">Laid down.</Label>
                <Input type="time" name="laid_down" id="laid_down" onChange={this.handleInputChange} value={this.state.log.laid_down} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="asleep" className="mr-sm-2">Fell asleep.</Label>
                <Input type="time" name="asleep" id="asleep" onChange={this.handleInputChange} value={this.state.log.asleep} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="gotUp" className="mr-sm-2">Got up.</Label>
                <Input type="time" name="got_up" id="got_up" onChange={this.handleInputChange} value={this.state.log.got_up} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="wokeUp" className="mr-sm-2">Woke up.</Label>
                <Input type="time" name="awake" id="awake" onChange={this.handleInputChange} value={this.state.log.awake} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="wakingHeartbeat" className="mr-sm-2">Waking heartbeat</Label>
                <Input type="number" name="waking_heartbeat" id="waking_heartbeat" onChange={this.handleInputChange} value={this.state.log.waking_heartbeat} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="date" className="mr-sm-2">Date</Label>
                <Input type="date" name="date" id="date" onChange={this.handleInputChange} value={this.state.log.date} />
              </FormGroup>
              <br />
              <Button id="login-button"
                disabled={
                  !(
                    this.state.log.laid_down &&
                    this.state.log.got_up &&
                    this.state.log.fk_user &&
                    this.state.log.date
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
      </div>)
  }
}

export default Sleeping