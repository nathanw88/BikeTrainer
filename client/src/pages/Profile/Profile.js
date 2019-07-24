import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Row, Col, Container } from "../../components/Grid/index"
import "./Profile.css"
import API from "../../utils/API"
import Graph from "../../components/Profile/Graph/Graph"
import Logs from "../../components/Profile/Logs/Logs"

class Profile extends Component {
  constructor(props) {
    super(props);



    this.state = {

      sleeping: {
        data: [],
      },
      biking: {
        data: [],
      },
      running: {
        data: [],
      },
      nutrient: {
        data: [],
      },
      cSelected: ["biking.distance_miles", "biking.avg_mph", "biking.duration_minutes", "biking.avg_heartbeat", "biking.max_heartbeat"],
      dSelected: ["sleeping", "biking", "running", "nutrient"],
      // data: [],
      // layout: {},
      // frames: [],
      // config: {},
      sleepingOpen: false,
      bikingOpen: false,
      runningOpen: false,
      nutrientOpen: false,
      displayOpen:false,
      display: "logs",
      graphDisplay: true,
      statsDisplay: false,
    }
    // this.onDisplayBtnClick = this.onDisplayBtnClick(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    this.onStatsboxBtnClick = this.onStatsboxBtnClick.bind(this);
    this.selectLogs("sleeping")
    this.selectLogs("running")
    this.selectLogs("biking")
    this.selectLogs("nutrient")


  }

  onDisplayBtnClick(display){

    this.setState({
      display
    })

  }

  toggleDisplay() {
    this.setState(prevState => ({
      graphDisplay: !prevState.graphDisplay,
      statsDisplay: !prevState.statsDisplay
    }));

  }
  toggle(menuOpen) {
    this.setState(prevState => ({
      [menuOpen]: !prevState[menuOpen]
    }));
  }

  onCheckboxBtnClick(selected) {

    let index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
      while (this.state.cSelected.length > 5) {
        this.state.cSelected.splice(0, 1);
      }
    }
    else {
      this.state.cSelected.splice(index, 1);

    }
    this.setState({ cSelected: [...this.state.cSelected] });


  }
  
  onStatsboxBtnClick(selected){
    
    let index = this.state.dSelected.indexOf(selected);
    if (index < 0) {
      this.state.dSelected.push(selected);
     
    }
    else {
      this.state.dSelected.splice(index, 1);

    }
    this.setState({ dSelected: [...this.state.dSelected] });

  }


  
  selectLogs(table) {
    API.selectLogs(localStorage.getItem("id"), table).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      }
      else if (!res.data.error) {
        switch (table) {
          case "sleeping":
            const { sleeping } = this.state
            sleeping.data = res.data
            this.setState({
              sleeping
            })

            break;
          case "running":
            const { running } = this.state
            running.data = res.data
            this.setState({
              running
            })

            break;
          case "biking":
            const { biking } = this.state
            biking.data = res.data
            this.setState({
              biking
            })

            break;
          case "nutrient":
            const { nutrient } = this.state
            nutrient.data = res.data
            console.log(nutrient)
            this.setState({
              nutrient
            })
            break;
          default:
            console.log("Error setting Data")
       
          
        }
        
      }

    })
  }

  render() {


    return (
      <div id="profile-container">
        <Container id="profile-inner-container" fluid>
          <Row>
            <Col size="lg-2">
              <Jumbotron id="controls-container">
                <Container fluid>
                {this.state.display === "graph" ?
                <div>
                  <p>Select five data points to plot.</p>
                  
                  <Dropdown isOpen={this.state.bikingOpen} toggle={() => this.toggle("bikingOpen")}>
                    <DropdownToggle caret>
                      Biking
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.difficulty")} active={this.state.cSelected.includes("biking.difficulty")}>Difficulty</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.distance_miles")} active={this.state.cSelected.includes("biking.distance_miles")}>Miles</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.duration_minutes")} active={this.state.cSelected.includes("biking.duration_minutes")}>Minutes</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.avg_heartbeat")} active={this.state.cSelected.includes("biking.avg_heartbeat")}>AVG heartbeat</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.max_heartbeat")} active={this.state.cSelected.includes("biking.max_heartbeat")}>Max heartbeat</Button>
                        {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.workout_type")} active={this.state.cSelected.includes("biking.workout_type")}>Workout type</Button> */}
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.avg_mph")} active={this.state.cSelected.includes("biking.avg_mph")}>AVG MPH</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <br />




                  <Dropdown isOpen={this.state.runningOpen} toggle={() => this.toggle("runningOpen")}>
                    <DropdownToggle caret>
                      Running
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.difficulty")} active={this.state.cSelected.includes("running.difficulty")}>Difficulty</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.distance_miles")} active={this.state.cSelected.includes("running.distance_miles")}>Miles</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.duration_minutes")} active={this.state.cSelected.includes("running.duration_minutes")}>Minutes</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.avg_heartbeat")} active={this.state.cSelected.includes("running.avg_heartbeat")}>AVG heartbeat</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.max_heartbeat")} active={this.state.cSelected.includes("running.max_heartbeat")}>Max heartbeat</Button>
                        {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.workout_type")} active={this.state.cSelected.includes("running.workout_type")}>Workout type</Button> */}
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.avg_mph")} active={this.state.cSelected.includes("running.avg_mph")}>AVG MPH</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <br />



                  <Dropdown isOpen={this.state.sleepingOpen} toggle={() => this.toggle("sleepingOpen")}>
                    <DropdownToggle caret>
                      Sleeping
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.laid_down")} active={this.state.cSelected.includes("sleeping.laid_down")}>Laid down</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.asleep")} active={this.state.cSelected.includes("sleeping.asleep")}>Asleep</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.awake")} active={this.state.cSelected.includes("sleeping.awake")}>Awake</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.got_up")} active={this.state.cSelected.includes("sleeping.got_up")}>Got up</Button> */}
                       <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.waking_heartbeat")} active={this.state.cSelected.includes("sleeping.waking_heartbeat")}>Waking heartbeat</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <br />




                  <Dropdown isOpen={this.state.nutrientOpen} toggle={() => this.toggle("nutrientOpen")}>
                    <DropdownToggle caret>
                      nutrient
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("nutrient.carbs")} active={this.state.cSelected.includes("nutrient.carbs")}>Carbs</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("nutrient.fats")} active={this.state.cSelected.includes("nutrient.fats")}>Fats</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("nutrient.proteins")} active={this.state.cSelected.includes("nutrient.proteins")}>Proteins</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <br />
                  
                  </div>
                  :
                   this.state.display === "logs" ? 
                    <div>
                      {/* <p>Toggle data to display.</p> */}
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("running")} active={this.state.dSelected.includes("running")}>{this.state.dSelected.includes("running")? <p>Remove running data.</p> :<p>Add running data.</p>}</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("biking")} active={this.state.dSelected.includes("biking")}>{this.state.dSelected.includes("biking")? <p>Remove biking data.</p> :<p>Add biking data.</p>}</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("sleeping")} active={this.state.dSelected.includes("sleeping")}>{this.state.dSelected.includes("sleeping")? <p>Remove sleeping data.</p> :<p>Add sleeping data.</p>}</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("nutrient")} active={this.state.dSelected.includes("nutrient")}>{this.state.dSelected.includes("nutrient")? <p>Remove nutrient data.</p> :<p>Add nutrient data.</p>}</Button>
                      <br/>
                      <br/>
                    </div>  
                    :
                  null
                }
                  {/* <Button onClick={this.toggleDisplay}>Change display</Button>  */}
                  <Dropdown isOpen={this.state.displayOpen} toggle={() => this.toggle("displayOpen")}>
                    <DropdownToggle caret>
                      Display
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        <Button className="profile-button" onClick={() => this.onDisplayBtnClick("graph")} active={this.state.display === "graph"}>Graph</Button>
                        <Button className="profile-button" onClick={() => this.onDisplayBtnClick("stats")} active={this.state.display === "stats"}>Stats</Button>
                        <Button className="profile-button" onClick={() => this.onDisplayBtnClick("logs")} active={this.state.display === "logs"}>Logs</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                </Container>
              </Jumbotron>
            </Col>
            <Col size="lg-3"></Col>
            <Col size="lg-6">
          
                {this.state.display === "graph" ?
                <Graph sleeping={this.state.sleeping.data} biking={this.state.biking.data} running={this.state.running.data} nutrient={this.state.nutrient.data} cSelected={this.state.cSelected}></Graph>
            
                :this.state.display === "logs" ?
                <Logs dSelected={this.state.dSelected} biking={this.state.biking} running={this.state.running} sleeping={this.state.sleeping} nutrient={this.state.nutrient}></Logs>
                : null
                  
                }
               
            </Col>
          </Row>
        </Container>
      </div>);
  }
}

export default Profile;