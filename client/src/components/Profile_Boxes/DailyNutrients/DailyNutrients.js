import React, { Component } from "react";
import API from "../../../utils/API";
import { Table, Jumbotron, FormGroup, Input } from 'reactstrap';
import "./DailyNutrients.css";

class DailyNutrients extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: parseInt(sessionStorage.getItem("id")),
      data: {
        date: new Date(),
        logs: []
      }
    }
  }

  componentDidMount = () => {
    const today = new Date()

    API.dailySum(this.state.fk_user, today).then((result) => {

        const { data } = this.state;
        data.logs = [...result.data];

        this.setState({ data });
      
    }).catch(error =>{
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  }

  dateClick = (event) => {
    let year = event.target.value.substr(0,4);
    let month = event.target.value.substr(5, 2) -1;
    let day = event.target.value.substr(8, 2);
    let { date } = this.state.data;
    let { data } = this.state;
    date.setUTCFullYear(year, month, day)

    API.dailySum(this.state.fk_user, date).then((result) => {

        data.logs = [...result.data];

        this.setState({ 
          data,
          date
        });
      
    }).catch(error =>{
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  }

  render() {

    return (
      <Jumbotron id="daily_nutrients-box" className="profile-box">
        <h2 className="text-center">Daily Nutrients</h2>
        <br/>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="date" name="date" id="date" onChange={this.dateClick} value={this.state.data.date.toISOString().substr(0, 10)} />
        </FormGroup>
        <br></br>
        {this.state.data.logs[0] ?
          <Table id="profile-table">
            <thead>
              <tr>
                <th>Macros</th>
                <th>Required</th>
                <th>Eaten</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.logs.map((logs, i) =>
                <tr key={i}>
                  <th scope="row">{logs.name}</th>
                  <td>{logs.amount}</td>
                  <td>{logs.log[0] ? logs.log[0].dailySum : 0}</td>
                </tr>)}
            </tbody>

          </Table> :
          <div></div>
        }

      </Jumbotron>);
  }
}

export default DailyNutrients