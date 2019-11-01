import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Row, Col, Container } from "../../components/Grid/index"
import "./Profile.css"
import API from "../../utils/API"
import Graph from "../../components/Profile/Graph/Graph"
import Logs from "../../components/Profile/Logs/Logs"
import Stats from "../../components/Profile/Stats/Stats"

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
      fats: {
        data: [],
      },
      protein: {
        data: [],
      },
      carbs: {
        data: [],
      },
      calories: {
        data: []


      },
      graphSelected: ["biking.distance_miles", "biking.avg_mph", "biking.duration_minutes", "biking.avg_heartbeat", "biking.max_heartbeat"],
      logsSelected: ["sleeping", "biking", "running", "protein", "fats", "carbs", "calories"],
      statsSelected: ["weeklyCalAvg", "weeklyCarbAvg", "weeklyProtienAvg", "weeklyFatAvg"],

      sleepingOpen: false,
      bikingOpen: false,
      runningOpen: false,
      macrosOpen: false,
      macroOpen: false,
      displayOpen: false,
      display: "logs",

    }
    this.onStatsBtnClick = this.onStatsBtnClick.bind(this);
    this.onDisplayBtnClick = this.onDisplayBtnClick.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    this.onLogsboxBtnClick = this.onLogsboxBtnClick.bind(this);
    this.selectLogs("sleeping")
    this.selectLogs("running")
    this.selectLogs("biking")
    this.selectLogs("Protein")
    this.selectLogs("Total_Lipids")
    this.selectLogs("Energy")
    this.selectLogs("Starch")


  };

  onStatsBtnClick(string) {

    let index = this.state.statsSelected.indexOf(string);
    if (index < 0) {
      this.state.statsSelected.push(string);
      while (this.state.statsSelected.length > 5) {
        this.state.statsSelected.splice(0, 1);
      }
    }
    else {
      this.state.statsSelected.splice(index, 1);

    }
    this.setState({ statsSelected: [...this.state.statsSelected] });

  };

  onDisplayBtnClick(display) {

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

    let index = this.state.graphSelected.indexOf(selected);
    if (index < 0) {
      this.state.graphSelected.push(selected);
      while (this.state.graphSelected.length > 5) {
        this.state.graphSelected.splice(0, 1);
      }
    }
    else {
      this.state.graphSelected.splice(index, 1);

    }
    this.setState({ graphSelected: [...this.state.graphSelected] });


  }

  onLogsboxBtnClick(selected) {

    let index = this.state.logsSelected.indexOf(selected);
    if (index < 0) {
      this.state.logsSelected.push(selected);

    }
    else {
      this.state.logsSelected.splice(index, 1);

    }
    this.setState({ logsSelected: [...this.state.logsSelected] });

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

          case "Total_Lipids":
            var { fats } = this.state
            fats.data = res.data
            this.setState({
              fats
            })
            break;

          case "Energy":
            var { calories } = this.state
            calories.data = res.data
            this.setState({
              calories
            })
            break;

          case "Starch":
            var { carbs } = this.state
            carbs.data = res.data
            this.setState({
              carbs
            })
            break;

          case "Protein":
            var { protein } = this.state
            protein.data = res.data
            this.setState({
              protein
            })
            break;
          default:
            console.log("Error")


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
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.difficulty")} active={this.state.graphSelected.includes("biking.difficulty")}>Difficulty</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.distance_miles")} active={this.state.graphSelected.includes("biking.distance_miles")}>Miles</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.duration_minutes")} active={this.state.graphSelected.includes("biking.duration_minutes")}>Minutes</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.avg_heartbeat")} active={this.state.graphSelected.includes("biking.avg_heartbeat")}>AVG heartbeat</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.max_heartbeat")} active={this.state.graphSelected.includes("biking.max_heartbeat")}>Max heartbeat</Button>
                            {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.workout_type")} active={this.state.graphSelected.includes("biking.workout_type")}>Workout type</Button> */}
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("biking.avg_mph")} active={this.state.graphSelected.includes("biking.avg_mph")}>AVG MPH</Button>
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
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.difficulty")} active={this.state.graphSelected.includes("running.difficulty")}>Difficulty</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.distance_miles")} active={this.state.graphSelected.includes("running.distance_miles")}>Miles</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.duration_minutes")} active={this.state.graphSelected.includes("running.duration_minutes")}>Minutes</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.avg_heartbeat")} active={this.state.graphSelected.includes("running.avg_heartbeat")}>AVG heartbeat</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.max_heartbeat")} active={this.state.graphSelected.includes("running.max_heartbeat")}>Max heartbeat</Button>
                            {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.workout_type")} active={this.state.graphSelected.includes("running.workout_type")}>Workout type</Button> */}
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("running.avg_mph")} active={this.state.graphSelected.includes("running.avg_mph")}>AVG MPH</Button>
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
                            {/* <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.laid_down")} active={this.state.graphSelected.includes("sleeping.laid_down")}>Laid down</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.asleep")} active={this.state.graphSelected.includes("sleeping.asleep")}>Asleep</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.awake")} active={this.state.graphSelected.includes("sleeping.awake")}>Awake</Button>
                        <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.got_up")} active={this.state.graphSelected.includes("sleeping.got_up")}>Got up</Button> */}
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("sleeping.waking_heartbeat")} active={this.state.graphSelected.includes("sleeping.waking_heartbeat")}>Waking heartbeat</Button>
                          </ButtonGroup>
                        </DropdownMenu>
                      </Dropdown>
                      <br />




                      {/* <Dropdown isOpen={this.state.macrosOpen} toggle={() => this.toggle("macrosOpen")}>
                        <DropdownToggle caret>
                          macros
        </DropdownToggle>
                        <DropdownMenu>
                          <ButtonGroup>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("macros.carbs")} active={this.state.graphSelected.includes("macros.carbs")}>Carbs</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("macros.fats")} active={this.state.graphSelected.includes("macros.fats")}>Fats</Button>
                            <Button className="profile-button" onClick={() => this.onCheckboxBtnClick("macros.proteins")} active={this.state.graphSelected.includes("macros.proteins")}>Proteins</Button>
                          </ButtonGroup>
                        </DropdownMenu>
                      </Dropdown> */}
                      {/* <Button className="profile-button" onClick={()=> this.onCheckboxBtnClick("macros")} active={this.state.graphSelected.includes("macros")}>macross</Button>
                      <br /> */}

                    </div>
                    :
                    this.state.display === "logs" ?
                      <div>
                        {/* <p>Toggle data to display.</p> */}
                        <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("running")} active={this.state.logsSelected.includes("running")}>{this.state.logsSelected.includes("running") ? <p>Remove running data.</p> : <p>Add running data.</p>}</Button>
                        <br />
                        <br />
                        <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("biking")} active={this.state.logsSelected.includes("biking")}>{this.state.logsSelected.includes("biking") ? <p>Remove biking data.</p> : <p>Add biking data.</p>}</Button>
                        <br />
                        <br />
                        <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("sleeping")} active={this.state.logsSelected.includes("sleeping")}>{this.state.logsSelected.includes("sleeping") ? <p>Remove sleeping data.</p> : <p>Add sleeping data.</p>}</Button>
                        <br />
                        <br />
                        <Dropdown isOpen={this.state.macroOpen} toggle={() => this.toggle("macroOpen")}>
                            <DropdownToggle caret>
                              macross
                            </DropdownToggle>
                            <DropdownMenu>
                              <ButtonGroup>
                                <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("calories")} active={this.state.logsSelected.includes("calories")}>Calories</Button>
                                <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("protein")} active={this.state.logsSelected.includes("protein")}>Proteins</Button>
                                <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("carbs")} active={this.state.logsSelected.includes("carbs")}>Carbs</Button>
                                <Button className="profile-button" onClick={() => this.onLogsboxBtnClick("fats")} active={this.state.logsSelected.includes("fats")}>Fats</Button>
                              </ButtonGroup>
                            </DropdownMenu>
                          </Dropdown>
                        <br />
                        <br />
                      </div>
                      : this.state.display === "stats" ?
                        <div>
                          <Dropdown isOpen={this.state.macroOpen} toggle={() => this.toggle("macroOpen")}>
                            <DropdownToggle caret>
                              macross
                            </DropdownToggle>
                            <DropdownMenu>
                              <ButtonGroup>
                                <Button className="profile-button" onClick={() => this.onStatsBtnClick("weeklyCalAvg")} active={this.state.statsSelected.includes("weeklyCalAvg")}>Daily calorie avg for the week</Button>
                                <Button className="profile-button" onClick={() => this.onStatsBtnClick("weeklyProtienAvg")} active={this.state.statsSelected.includes("weeklyProtienAvg")}>Daily protien avg for the week</Button>
                                <Button className="profile-button" onClick={() => this.onStatsBtnClick("weeklyCarbAvg")} active={this.state.statsSelected.includes("weeklyCarbAvg")}>Daily carb avg for the week</Button>
                                <Button className="profile-button" onClick={() => this.onStatsBtnClick("weeklyFatAvg")} active={this.state.statsSelected.includes("weeklyFatAvg")}>Daily fat avg for the week</Button>
                              </ButtonGroup>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        : null
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
                <Graph sleeping={this.state.sleeping.data} biking={this.state.biking.data} running={this.state.running.data} graphSelected={this.state.graphSelected} fats={this.state.fats.data} calories={this.state.calories.data} carbs={this.state.carbs.data} protein={this.state.protein.data}></Graph>

                : this.state.display === "logs" ?
                  <Logs logsSelected={this.state.logsSelected} biking={this.state.biking} running={this.state.running} sleeping={this.state.sleeping} fats={this.state.fats} calories={this.state.calories} carbs={this.state.carbs} protein={this.state.protein}></Logs>
                  : this.state.display === "stats" ?
                    <Stats statsSelected={this.state.statsSelected} biking={this.state.biking} running={this.state.running} sleeping={this.state.sleeping} fats={this.state.fats} calories={this.state.calories} carbs={this.state.carbs} protein={this.state.protein}></Stats>
                    : null


              }

            </Col>
          </Row>
        </Container>
      </div>);
  }
}

export default Profile;