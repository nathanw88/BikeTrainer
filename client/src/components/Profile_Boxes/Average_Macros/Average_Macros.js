import React, { Component } from "react";
import API from "../../../utils/API";
import { Table } from 'reactstrap';
// import "./Daily_Sum_Macros.css";

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
        // console.log(result)
        data.logs = [...result.data];

        this.setState({
          data,
          dateFrom
        });
      }
      // console.log(this.state.data);
      // console.log(this.state.data.dailyMacros.logs[0])
    });


  }

  dateClick = (num, name) => {
    let { data } = this.state;
    data[name].setDate(data[name].getDate() + num);

    this.setState({
      data
    });

    API.averageMacros(this.state.fk_user, data.dateFrom, data.dateTill).then((result) => {
      // console.log(result)
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
      // console.log(this.state.data);
      // console.log(this.state.data.dailyMacros.logs[0])
    });

    // this.setState({
    //   date
    // });

  }

  render() {

    return (
      <div className="profile-box">
        <h3><span onClick={() => { this.dateClick(-1, "dateFrom") }}> &lt; </span>{this.state.data.dateFrom.toDateString()} <span onClick={() => { this.dateClick(1, "dateFrom") }}> &gt; </span></h3>
        <h3><span onClick={() => { this.dateClick(-1, "dateTill") }}> &lt; </span>{this.state.data.dateTill.toDateString()} <span onClick={() => { this.dateClick(1, "dateTill") }}> &gt; </span></h3>
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

      </div>);
  }
}

export default Average_Macros