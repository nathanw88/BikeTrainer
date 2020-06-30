import React, { Component } from "react";
import API from "../../../utils/API";
import { Jumbotron, FormGroup, Input } from 'reactstrap';
import "./Daily_Macros_Bar.css";
import {
  VictoryBar, VictoryChart, VictoryAxis,
  VictoryLegend, VictoryStack, VictoryTooltip
} from 'victory';

class Daily_Macros_Bar extends Component {

  constructor(props) {

    super(props);

    this.state = {

      useCanvas: false,
      fk_user: sessionStorage.getItem("id"),
      data: {
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
    console.log(date)

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
      <Jumbotron id="daily_macros-box" className="profile-box">
        <h2 className="text-center">Daily Macros Bar Chart</h2>
        <br />
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="date" name="date" id="date" onChange={this.dateClick} value={this.state.data.date.toISOString().substr(0, 10)} />
        </FormGroup>
        <br />
        {logs[0] ?
          <VictoryChart
            domainPadding={25}
          >
            <VictoryAxis
              style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
              tickValues={["Calories", "Fats", "Carbs", "Protien"]}
            />
            <VictoryAxis
              style={{ tickLabels: { fill: "rgb(205,205,231)" } }}
              dependentAxis
              tickFormat={(x) => (x)}
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
                data={[
                  { x: "Calories", y: logs[0].log[0] ? logs[0].log[0].dailySum : 0, label: `Calories Eaten: ${logs[0].log[0]?.dailySum}` },
                  { x: "Fats", y: logs[1].log[0] ? logs[1].log[0].dailySum : 0, label: `Fats Eaten: ${logs[1].log[0]?.dailySum}` },
                  { x: "Carbs", y: logs[2].log[0] ? logs[2].log[0].dailySum : 0, label: `Carbs Eaten: ${logs[2].log[0]?.dailySum}` },
                  { x: "Protien", y: logs[3].log[0] ? logs[3].log[0].dailySum : 0, label: `Protien Eaten: ${logs[3].log[0]?.dailySum}` }
                ]}
              />
              {/* Amount Still Needed */}
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={[
                  { x: "Calories", y: logs[0].log[0] ? logs[0].amount - logs[0].log[0].dailySum : logs[0].amount, label: `Calories Left To Eat: ${logs[0].log[0] ? logs[0].amount - logs[0].log[0].dailySum : logs[0].amount}` },
                  { x: "Fats", y: logs[1].log[0] ? logs[1].amount - logs[1].log[0].dailySum : logs[1].amount, label: `Fats Left To Eat: ${logs[1].log[0] ? logs[1].amount - logs[1].log[0].dailySum : logs[1].amount}` },
                  { x: "Carbs", y: logs[2].log[0] ? logs[2].amount - logs[2].log[0].dailySum : logs[2].amount, label: `Carbs Left To Eat: ${logs[2].log[0] ? logs[2].amount - logs[2].log[0].dailySum : logs[2].amount}` },
                  { x: "Protien", y: logs[3].log[0] ? logs[3].amount - logs[3].log[0].dailySum : logs[3].amount, label: `Protien Left To Eat: ${logs[3].log[0] ? logs[3].amount - logs[3].log[0].dailySum : logs[3].amount}` }
                ]}
              />

            </VictoryStack>
          </VictoryChart> : <div></div>}
      </Jumbotron>);
  }
}

export default Daily_Macros_Bar



// <VictoryBar
// data={[
//   { Nutrients: 'Calories', Amount: logs[0].amount, label: ` Needed ` },
//   { Nutrients: 'Calories', Amount: logs[0].log[0] ? logs[0].log[0].dailySum : 0, label: ` Ate ` },
//   { Nutrients: 'Fats', Amount: logs[1].amount, label: ` Needed ` },
//   { Nutrients: 'Fats', Amount: logs[1].log[0] ? logs[1].log[0].dailySum : 0, label: ` Ate ` },
//   { Nutrients: 'Carbs', Amount: logs[2].amount, label: ` Needed ` },
//   { Nutrients: 'Carbs', Amount: logs[2].log[0] ? logs[2].log[0].dailySum : 0, label: ` Ate ` },
//   { Nutrients: 'Protien', Amount: logs[3].amount, label: ` Needed ` },
//   { Nutrients: 'Protien', Amount: logs[3].log[0] ? logs[3].log[0].dailySum : 0, label: ` Ate ` }
// ]}
// style={{ labels: { fill: "white" } }}
// labelComponent={<VictoryLabel angle={0} verticalAnchor="middle" textAnchor="end" />}
// x="Nutrients"
// y="Amount"
// />