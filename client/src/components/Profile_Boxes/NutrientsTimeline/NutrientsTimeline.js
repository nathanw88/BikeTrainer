import React, { Component } from "react";
import API from "../../../utils/API";
import { Jumbotron, FormGroup, Label, Input, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLegend, VictoryVoronoiContainer } from 'victory'
import "./NutrientsTimeline.css";


class NutrientsTimeline extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: parseInt(sessionStorage.getItem("id")),
      selectedNutrients: {},
      data: {
        graphArrays: [],
        eatenArrayObjects: [],
        neededArrayObjects: [],
        dateFrom: new Date(),
        dateTill: new Date(),
        logs: []
      }
    }
  }

  componentDidMount = () => {
    const { data, selectedNutrients } = this.state;
    let { dateFrom } = this.state.data
    const today = new Date();
    dateFrom.setDate(today.getDate() - 7);

    API.userNutrientsTimeline(this.state.fk_user, dateFrom, today).then((result) => {

      if (result.data.error) {
        // alert(result.data.error)

        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }
      }
      else {
        data.logs = [...result.data];

        result.data.map((dataObject, i) => {
          let eatenArray = [];
          let neededArray = [];
          dataObject.log.map((log) => {
            eatenArray.push({ x: new Date(log.date), y: log.dailySum })
            neededArray.push({ x: new Date(log.date), y: dataObject.amount });
          });
          data.neededArrayObjects[i] = [...neededArray];
          data.eatenArrayObjects[i] = [...eatenArray];
        })
        selectedNutrients[data.logs[0].name] = 0
        this.setState({
          data,
          selectedNutrients,
          dateFrom
        });
      }
    });
  }

  dateClick = (event, name) => {
    let year = event.target.value.substr(0, 4);
    let month = event.target.value.substr(5, 2) - 1;
    let day = event.target.value.substr(8, 2);
    let { data } = this.state;
    data[name].setUTCFullYear(year, month, day);

    this.setState({
      data
    });

    API.userNutrientsTimeline(this.state.fk_user, data.dateFrom, data.dateTill).then((result) => {

      if (result.data.error) {
        alert(result.data.error)

        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }
      }
      else {
        data.logs = [...result.data];
        result.data.map((dataObject, i) => {
          let eatenArray = [];
          let neededArray = [];
          dataObject.log.map((log) => {
            eatenArray.push({ x: new Date(log.date), y: log.dailySum, label: `${log.dailySum}` })
            neededArray.push({ x: new Date(log.date), y: dataObject.amount, label: `${dataObject.amount}` });
          });
          data.neededArrayObjects[i] = [...neededArray];
          data.eatenArrayObjects[i] = [...eatenArray];
        })

        this.setState({
          data
        });
      }
    });
  }

  nurtientChoice(nutrient, index) {
    const { selectedNutrients } = this.state;

    // let index = selectedNutrients.indexOf(nutrient);
    if (nutrient in selectedNutrients) {
      delete selectedNutrients[nutrient];
    }
    else {
      selectedNutrients[nutrient] = index;
    }

    this.setState({ selectedNutrients });
  }

  render() {
    const { data, selectedNutrients } = this.state;
    const { neededArrayObjects, eatenArrayObjects } = data;

    return (
      <Jumbotron id="nutrients_timeline-box" className="profile-box">
        <h2 className="text-center">Nutrients Timeline</h2>
        <br />
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <div className="table">
            <Label for="date" className="mr-sm-2, table-cell">From</Label>
            <Input type="date" name="date" id="date" className="table-cell" onChange={(event) => { this.dateClick(event, "dateFrom") }} value={this.state.data.dateFrom.toISOString().substr(0, 10)} />
          </div>
          <div className="table">
            <Label for="date" className="mr-sm-2, table-cell"> &#8202; To &#8239; &#8239; </Label>
            <Input type="date" name="date" id="date" className="table-cell" onChange={(event) => { this.dateClick(event, "dateTill") }} value={this.state.data.dateTill.toISOString().substr(0, 10)} />
          </div>
          <br />
          {data.logs.length > 0 ?
            <UncontrolledDropdown>
              <DropdownToggle caret>
                Nutrients Selected
              </DropdownToggle>
              <DropdownMenu>
                {data.logs.map((log, i) =>
                  <DropdownItem className={"portion-button"} active={Object.keys(selectedNutrients).indexOf(log.name) >= 0} key={i} onClick={() => this.nurtientChoice(log.name, i)}>{log.name}</DropdownItem>
                )
                };
                  </DropdownMenu>
            </UncontrolledDropdown>
            : <div></div>
          }
        </FormGroup>
        <br />
        <br />

        {Object.values(selectedNutrients).map((index) =>
          <div key={index}>

            <h3 className="text-center">{data.logs[index].name}</h3>
            <br />
            {(neededArrayObjects[index].length > 0) ?
              <VictoryChart
                scale={{ x: "time" }}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) => `${datum.x.toDateString()}, ${data.logs[index].name}: ${Math.round(datum.y, 2)}`}
                  />
                }
              >
                <VictoryLegend x={200} y={0}

                  orientation="horizontal"
                  gutter={20}
                  style={{ border: { stroke: "black" }, labels: { fill: "rgb(205,205,231)" } }}
                  data={[
                    { name: "Ate", symbol: { fill: "tomato" } },
                    { name: "Needed", symbol: { fill: "gold" } }
                  ]}
                />

                <VictoryAxis
                  style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
                />
                <VictoryAxis
                  style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
                  dependentAxis
                />
                <VictoryLine style={{ labels: { fill: "gold" }, data: { stroke: "gold" } }}
                  data={[...neededArrayObjects[index]]}
                />
                <VictoryLine style={{ labels: { fill: "tomato" }, data: { stroke: "tomato" } }}
                  data={[...eatenArrayObjects[index]]} />


              </VictoryChart> :
              <h5 className="text-center">No Logs For Selected Date</h5>}
            <br />
            <br />
          </div>

        )}
        {/* <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          /> */}

      </Jumbotron>);
  }
}

export default NutrientsTimeline