import React, { Component } from "react";
import API from "../../utils/API";
import { Table } from 'reactstrap';
import "./Profile.css";

class Profile extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: sessionStorage.getItem("id"),
      data: {
        dailyMacros: {
          date: new Date(),
          logs: []
        }
      }
    }
  }

  componentDidMount = () => {
    const today = new Date()

    API.profile(this.state.fk_user, today).then((result) => {
      // console.log(result)
      const { data } = this.state;
      data.dailyMacros.logs = [...result.data];

      this.setState({ data });
      console.log(this.state.data);
      // console.log(this.state.data.dailyMacros.logs[0])
    });
    // console.log(this.state.data);

  }

  dateClick = (num, name) => {
    let { date } = this.state.data[name];
    let { data } = this.state;
    date.setDate(date.getDate() + num);

    API.profile(this.state.fk_user, date).then((result) => {
      // console.log(result)

      data.dailyMacros.logs = [...result.data];

      this.setState({
        data,
        date
      });
      // console.log(this.state.data);
      // console.log(this.state.data.dailyMacros.logs[0])
    });

    // this.setState({
    //   date
    // });

  }

  render() {

    return (<div id="profile-container">
      <div className="profile-box">
        <h3><span onClick={() => { this.dateClick(-1, "dailyMacros") }}> &lt; </span>{this.state.data.dailyMacros.date.toDateString()} <span onClick={() => { this.dateClick(1, "dailyMacros") }}> &gt; </span></h3>
        {this.state.data.dailyMacros.logs[0] ?
          <Table id="profile-table">
            <thead>
              <tr>
                <th>Macros</th>
                <th>Required</th>
                <th>Eaten</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.dailyMacros.logs.map(logs =>
                <tr>
                  <th scope="row">{logs.name}</th>
                  <td>{logs.amount}</td>
                  <td>{logs.log[0] ? logs.log[0].dailySum : 0}</td>
                </tr>)}
            </tbody>

          </Table> :
          <div></div>
        }

      </div>

    </div>);
  }
}

export default Profile