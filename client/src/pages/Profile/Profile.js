import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Row, Col, Container } from "../../components/Grid/index"
import "./Profile.css"
import API from "../../utils/API"
import Plot from 'react-plotly.js';
class Profile extends Component {
  constructor(props) {
    super(props);

    // this.state = { cSelected: [] };


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
      food: {
        data: [],
      },
      cSelected: ["biking.distance_miles", "biking.avg_mph", "biking.duration_minutes", "biking.avg_heartbeat", "biking.max_heartbeat"],
      dSelected: ["sleeping", "biking", "running", "food"],
      data: [],
      layout: {},
      frames: [],
      config: {},
      sleepingOpen: false,
      bikingOpen: false,
      runningOpen: false,
      foodOpen: false,
      graphDisplay: true,
      statsDisplay: false,
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    this.onStatsboxBtnClick = this.onStatsboxBtnClick.bind(this);
    this.selectLogs("sleeping")
    this.selectLogs("running")
    this.selectLogs("biking")
    this.selectLogs("food")


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
    this.buildPlot()

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


  buildPlot() {
    var trace1 = {
      x: [],
      y: [],
      name: '',
      type: 'scatter'
    };

    var trace2 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace3 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace4 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace5 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    }
    for (var i = 0; i < this.state.cSelected.length; i++) {
      var selected = this.state.cSelected[i].split(".")
      for (var j = 0; j < this.state[selected[0]].data.length; j++) {
        switch (i) {
          case 0:
            trace1.x.push(this.state[selected[0]].data[j].date)
            trace1.y.push(this.state[selected[0]].data[j][selected[1]])
            trace1.name = selected[1]
            trace1.yaxis = selected[1]
            break;
          case 1:
            trace2.x.push(this.state[selected[0]].data[j].date)
            trace2.y.push(this.state[selected[0]].data[j][selected[1]])
            trace2.name = selected[1]
            trace2.yaxis = selected[1]
            break;
          case 2:
            trace3.x.push(this.state[selected[0]].data[j].date)
            trace3.y.push(this.state[selected[0]].data[j][selected[1]])
            trace3.name = selected[1]
            trace3.yaxis = selected[1]
            break;
          case 3:
            trace4.x.push(this.state[selected[0]].data[j].date)
            trace4.y.push(this.state[selected[0]].data[j][selected[1]])
            trace4.name = selected[1]
            trace4.yaxis = selected[1]
            break;
          case 4:
            trace5.x.push(this.state[selected[0]].data[j].date)
            trace5.y.push(this.state[selected[0]].data[j][selected[1]])
            trace5.name = selected[1]
            trace5.yaxis = selected[1]
            break;
          default:
           console.log("Error building plot data")
        }
      }
    }
    this.state.data.push(trace1, trace2, trace3, trace4, trace5)
    while (this.state.data.length > 5) {
      this.state.data.splice(0, 1)
    }
    this.setState({ data: [...this.state.data] });
   

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
          case "food":
            const { food } = this.state
            food.data = res.data
            this.setState({
              food
            })
            break;
          default:
            console.log("Error setting Data")
       
          
        }
        this.buildPlot()
      }

    })
  }

  render() {


    return (
      <div id="profile-container">
        <Container id="profile-inner-container" fluid>
          <Row>
            <Col size="md-2">
              <Jumbotron id="controls-container">
                <Container fluid>
                {this.state.graphDisplay ?
                <div>
                  <h5>Select five</h5>
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




                  <Dropdown isOpen={this.state.foodOpen} toggle={() => this.toggle("foodOpen")}>
                    <DropdownToggle caret>
                      Food
        </DropdownToggle>
                    <DropdownMenu>
                      <ButtonGroup>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("food.carbs")} active={this.state.cSelected.includes("food.carbs")}>Carbs</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("food.fats")} active={this.state.cSelected.includes("food.fats")}>Fats</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("food.proteins")} active={this.state.cSelected.includes("food.proteins")}>Proteins</Button>
                      </ButtonGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <br />
                  
                  </div>
                  :
                   this.state.statsDisplay? 
                    <div>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("running")} active={this.state.dSelected.includes("running")}>Running</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("biking")} active={this.state.dSelected.includes("biking")}>Biking</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("sleeping")} active={this.state.dSelected.includes("sleeping")}>Sleeping</Button>
                      <br/>
                      <br/>
                      <Button className="profile-button" onClick={() => this.onStatsboxBtnClick("food")} active={this.state.dSelected.includes("food")}>Food</Button>
                      <br/>
                      <br/>
                    </div>  
                    :
                  null
                }
                  <Button onClick={this.toggleDisplay}>Change display</Button> 
                </Container>
              </Jumbotron>
            </Col>
            <Col size="md-2"></Col>
            <Col size="md-7">
              <Jumbotron id="profile-jumbotron">
                {this.state.graphDisplay ?
                <div>
                  <Plot
                    data={this.state.data}
                    layout={this.state.layout}
                    frames={this.state.frames}
                    config={this.state.config}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                  />
                  <p>Selected: {this.state.cSelected.toString()}</p> 
                  </div>
                  : this.state.statsDisplay ? <div>{
                  this.state.dSelected.map((item, key) =>
                  
                   this.state[item].data.map((data, index)=>
                   
                     (item === "biking")? <div><h5>Biking</h5>
                     <p>Date: {data.date.replace("T", " ").replace(":00.000Z", "")} Difficulty: {data.difficulty} Miles: {data.distance_miles} Minutes: {data.duration_miles} AVG Heartbeat: {data.avg_heartbeat} Max Heartbeat: {data.max_heartbeat} Type: {data.workout_type} MPH:{data.avg_mph}</p>
                     </div>
                     :
                     (item === "running")? <div><h5>Running</h5>
                      <p>Date: {data.date.replace("T", " ").replace(":00.000Z", "")} Difficulty: {data.difficulty} Miles: {data.distance_miles} Minutes: {data.duration_miles} AVG Heartbeat: {data.avg_heartbeat} Max Heartbeat: {data.max_heartbeat} Type: {data.workout_type} MPH:{data.avg_mph}</p>
                      </div>
                     : 
                      item === "sleeping"? <div><h5>Sleeping</h5>
                      <p>Date: {data.date.replace("T06:00:00.000Z", "")} Laid down: {data.laid_down.replace("00.000000", "")} Asleep: {data.asleep.replace("00.000000", "")} Got up: {data.got_up.replace("00.000000", "")} Awake: {data.awake.replace("00.000000", "")} Waking heartbeat{data.waking_heartbeat}</p>
                      </div>
                      :
                        item === "food"?<div><h5>Food</h5>
                         <p>Date: {data.date.replace("T", " ").replace(":00.000Z", "")}</p>
                         </div>
                        :
                          null
                   )
                  )
                }
                  </div> :
                    null
                }
               

              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>);
  }
}

export default Profile;