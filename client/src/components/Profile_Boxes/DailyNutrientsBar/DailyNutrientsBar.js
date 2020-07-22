import React, { Component } from "react";
import API from "../../../utils/API";
import { Jumbotron, FormGroup, Input } from 'reactstrap';
import "./DailyNutrientsBar.css";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryStack, VictoryTooltip, VictoryZoomContainer } from 'victory';

class DailyNutrientsBar extends Component {

  constructor(props) {

    super(props);

    this.state = {
      fk_user: sessionStorage.getItem("id"),
      data: {
        eatenObjects:[],
        neededObjects:[],
        xValues:[],
        date: new Date(),
        logs: []
      }
    }
  }

  componentDidMount = () => {
    const today = new Date()

    API.dailySum(this.state.fk_user, today).then((result) => {

      if (result.data.error) {

        alert(result.data.error)
        if (result.data.error === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace(result.data.redirect);
        }
      }
      else {
        const { data } = this.state;
        data.logs = [...result.data];
        let  eatenObject = {};
        let neededObject ={};
        

        result.data.map((dataObject)=>{
          eatenObject = { x: dataObject.name, y: dataObject.log[0] ? dataObject.log[0].dailySum : 0, label: `${dataObject.name} Eaten: ${dataObject.log[0]?.dailySum}` };
          neededObject = { x: dataObject.name, y: dataObject.log[0] ? dataObject.amount - dataObject.log[0].dailySum : dataObject.amount, label: `${dataObject.name} Left To Eat: ${dataObject.log[0] ? dataObject.amount - dataObject.log[0].dailySum : dataObject.amount}` };
          data.xValues = data.xValues.concat(dataObject.name);
          data.neededObjects = data.neededObjects.concat(neededObject);
          data.eatenObjects = data.eatenObjects.concat(eatenObject);
        })

        this.setState({ data });
      }
    });
  }

  dateClick = (event) => {
    let year = event.target.value.substr(0, 4);
    let month = event.target.value.substr(5, 2) - 1;
    let day = event.target.value.substr(8, 2);
    let { date } = this.state.data;
    let { data } = this.state;
    date.setUTCFullYear(year, month, day)

    API.dailySum(this.state.fk_user, date).then((result) => {

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

        let  eatenObject = {};
        data.eatenObjects = []

        result.data.map((dataObject)=>{
          eatenObject = { x: dataObject.name, y: dataObject.log[0] ? dataObject.log[0].dailySum : 0, label: `${dataObject.name} Eaten: ${dataObject.log[0]?.dailySum}` };
          data.eatenObjects = data.eatenObjects.concat(eatenObject);
        })
        
        this.setState({
          data,
          date
        });
      }
    });
  }



  render() {
    const { logs } = this.state.data;

    return (
      <Jumbotron id="daily_nutrients-box" className="profile-box">
        <h2 className="text-center">Daily Nutrition Bar Chart</h2>
        <br />
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="date" name="date" id="date" onChange={this.dateClick} value={this.state.data.date.toISOString().substr(0, 10)} />
        </FormGroup>
        <br />
        {logs[0] ?
          <VictoryChart
            domainPadding={25}
            containerComponent={<VictoryZoomContainer zoomDimension="y" />}
          >
            <VictoryAxis
              style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
              tickValues={[...this.state.data.xValues]}
            />
            <VictoryAxis
              style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
              dependentAxis
            />
            <VictoryLegend x={200} y={0}
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, labels: { fill: "rgb(205,205,231)" } }}
              data={[
                { name: "Ate", symbol: { fill: "tomato" } },
                { name: "Needed", symbol: { fill: "gold" } }
              ]}
            />

            <VictoryStack
              colorScale={["tomato", "gold"]}
            >

              {/* Amount Eaten */}
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={[ ...this.state.data.eatenObjects ]}
              />
              {/* Amount Still Needed */}
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={[ ...this.state.data.neededObjects ]}
              />

            </VictoryStack>
          </VictoryChart> : <div></div>}
      </Jumbotron>);
  }
}

export default DailyNutrientsBar