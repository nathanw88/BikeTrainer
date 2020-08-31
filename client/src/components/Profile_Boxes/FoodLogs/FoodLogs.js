import React, { Component } from "react";
import API from "../../../utils/API";
import { Jumbotron, FormGroup, Input, Label, Button } from 'reactstrap';
import "./FoodLogs.css"


class FoodLogs extends Component {

  constructor(props) {

    super(props);

    this.state = {
      fk_user: parseInt(sessionStorage.getItem("id")),
      limit: 5,
      offset: 0,
      data: {

        dateFrom: new Date(),
        dateTill: new Date(),
        logs: []
      }
    }
  }

  componentDidMount = () => {
    let { dateFrom } = this.state.data
    const today = new Date();
    dateFrom.setDate(today.getDate() - 7);

    API.userFoodLogs(this.state.fk_user, dateFrom, today, this.state.limit, this.state.offset).then((result) => {

      const { data } = this.state;
      data.logs = [...result.data];
      this.setState({ data, dateFrom });

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
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

    API.userFoodLogs(this.state.fk_user, data.dateFrom, data.dateTill, this.state.limit, this.state.offset).then((result) => {

      data.logs = [...result.data];
      this.setState({ data });

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  }

  deleteLog = (index) => {
    const { fk_food, grams, date } = this.state.data.logs[index]
    const sendData = { fk_food, grams, date, id: this.state.fk_user }
    const { dateFrom, dateTill } = this.state.data;
    const { data } = this.state

    API.deleteUserLogs(sendData).then((result) => {
      API.userFoodLogs(this.state.fk_user, dateFrom, dateTill, this.state.limit, this.state.offset).then((result) => {

        data.logs = [...result.data];
        this.setState({ data });

      }).catch(error => {
        alert(error.response.data.message);
        if (error.response.data.message === "Your session has expired.") {
          sessionStorage.setItem("email", "");
          sessionStorage.setItem("id", "");
          window.location.replace("/");
        };
      });
    })
  }

  limitChange = event => {
    let { limit, data, offset } = this.state;
    limit = event.target.value;
    const { dateFrom, dateTill } = this.state.data;

    API.userFoodLogs(this.state.fk_user, dateFrom, dateTill, limit, offset).then((result) => {

      data.logs = [...result.data];
      this.setState({ limit, data })

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  }
  more = () => {
    let { limit, data, offset } = this.state;
    const { dateFrom, dateTill } = this.state.data;
    offset = limit + offset;

    API.userFoodLogs(this.state.fk_user, dateFrom, dateTill, limit, offset).then((result) => {

      data.logs = [...result.data];
      this.setState({ offset, data })

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });

  }

  back = () => {
    let { limit, data, offset } = this.state;
    const { dateFrom, dateTill } = this.state.data;
    offset = offset - limit;

    API.userFoodLogs(this.state.fk_user, dateFrom, dateTill, limit, offset).then((result) => {

      data.logs = [...result.data];
      this.setState({ offset, data })

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });

  }


  render() {
    const { logs } = this.state.data;

    return (
      <Jumbotron id="FoodLogs-box" className="profile-box">
        <h2 className="text-center">Nutrients Logs</h2>
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
          <div className="table">
            <Label for="limit" className="mr-sm-2, table-cell">Limit &#8239;</Label>
            <Input type="number" name="limit" id="limit" className="table-cell" onChange={this.limitChange} value={this.state.limit} />
          </div>
          <br />
        </FormGroup>
        {logs.length > 0 ?
          <Jumbotron className="logs-box"> {logs.map((log, i) => <div key={i}>

            {log.brand ? <h4>{log.brand}&copy;</h4> : <div></div>}
            <h6>  {log.description}</h6>
            <p><b>Grams:</b> {log.grams}</p>
            <p><b>Date:</b> {log.date.replace("T", " ").replace(".000Z", "")}</p>
            <br />
            <p><Button id="log-delete" onClick={() => this.deleteLog(i)}>Delete</Button></p>
            <br />
            <p className="text-center"> - - - - - - - - - - - - - - - - - - - - </p>
            <br />

          </div>
          )}
            {this.state.offset > 0 ? <Button onClick={this.back}>Back</Button> : <div></div>}
            <Button onClick={this.more}>More</Button>
          </Jumbotron>
          : <div>
            <h3>No Logs Between Choosen Dates</h3>
            {this.state.offset > 0 ? <Button onClick={this.back}>Back</Button> : <div></div>}
          </div>
        }
      </Jumbotron>);
  }
}

export default FoodLogs