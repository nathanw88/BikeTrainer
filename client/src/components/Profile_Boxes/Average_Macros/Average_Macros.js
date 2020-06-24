import React, { Component } from "react";
import API from "../../../utils/API";
import { Table, Jumbotron, FormGroup, Label, Input } from 'reactstrap';
import "./Average_Macros.css";

class Average_Macros extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: sessionStorage.getItem("id"),
      data: {
        dateFrom: new Date(),
        dateTill: new Date(),
        logs: []
      }
    }
  }

  componentDidMount = () => {
    const { data } = this.state;
    let { dateFrom } = this.state.data
    const today = new Date();
    dateFrom.setDate(today.getDate() - 7);

    API.averageMacros(this.state.fk_user, dateFrom, today).then((result) => {

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

    API.averageMacros(this.state.fk_user, data.dateFrom, data.dateTill).then((result) => {

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
          data
        });
      }
    });
  }

  render() {

    return (
      <Jumbotron id="average_macros-box" className="profile-box">
        <h2 className="text-center">Average Macros</h2>
        <br/>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <div className="table">
            <Label for="date" className="mr-sm-2, table-cell">From</Label>
            <Input type="date" name="date" id="date"  className="table-cell" onChange={(event) => { this.dateClick(event, "dateFrom") }} value={this.state.data.dateFrom.toISOString().substr(0, 10)} />
          </div>
          <div className="table">
            <Label for="date" className="mr-sm-2, table-cell"> &#8202; To &#8239; &#8239; </Label>
            <Input type="date" name="date" id="date" className="table-cell" onChange={(event) => { this.dateClick(event, "dateTill") }} value={this.state.data.dateTill.toISOString().substr(0, 10)} />
          </div>
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
              {this.state.data.logs.map(logs =>
                <tr>
                  <th scope="row">{logs.name}</th>
                  <td>{logs.amount}</td>
                  <td>{logs.log[0] ? logs.log[0].dailyAverage : 0}</td>
                </tr>)}
            </tbody>

          </Table> :
          <div></div>
        }
        <h5>* Only Averages From Days With At Least One Log</h5>
      </Jumbotron>);
  }
}

export default Average_Macros