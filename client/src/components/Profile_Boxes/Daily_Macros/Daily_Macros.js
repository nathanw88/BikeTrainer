import React, { Component } from "react";
import API from "../../../utils/API";
import { Table, Jumbotron } from 'reactstrap';
import "./Daily_Macros.css";

class Daily_Macros extends Component {

  constructor(props) {

    super(props);

    this.state = {

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
        // console.log(result)
        const { data } = this.state;
        data.logs = [...result.data];

        this.setState({ data });
      }
      // console.log(this.state.data);
      // console.log(this.state.data.dailyMacros.logs[0])
    });
    // console.log(this.state.data);

  }

  dateClick = (num) => {
    let { date } = this.state.data;
    let { data } = this.state;
    date.setDate(date.getDate() + num);

    API.dailySum(this.state.fk_user, date).then((result) => {
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
          data,
          date
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
      <Jumbotron id="daily_macros-box" className="profile-box">
        <h3><span onClick={() => { this.dateClick(-1) }}> &lt; </span>{this.state.data.date.toDateString()} <span onClick={() => { this.dateClick(1) }}> &gt; </span></h3>
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
                  <td>{logs.log[0] ? logs.log[0].dailySum : 0}</td>
                </tr>)}
            </tbody>

          </Table> :
          <div></div>
        }

      </Jumbotron>);
  }
}

export default Daily_Macros