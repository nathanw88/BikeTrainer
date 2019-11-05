import React, { Component } from "react";
import { Jumbotron } from 'reactstrap';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  };



  render() {


    return (



      <Jumbotron id="profile-jumbotron">
        <div id="data-container">{
          this.props.logsSelected.map((item) =>

            this.props[item].data.map((data) =>

              item === "biking" ? <div><h5>Biking</h5>
                <p><b>Date:</b> {data.date.replace("T", " ").replace(":00.000Z", "")} <b>Difficulty:</b> {data.difficulty} <b>Miles:</b> {data.distance_miles} <b>Minutes:</b> {data.duration_minutes} <b>AVG Heartbeat:</b> {data.avg_heartbeat} <br />  <b>Max Heartbeat:</b> {data.max_heartbeat} <b>Type:</b> {data.workout_type} <b>MPH: </b>{data.avg_mph}</p>
              </div>
                :
                item === "running" ? <div><h5>Running</h5>
                  <p><b>Date:</b> {data.date.replace("T", " ").replace(":00.000Z", "")} <b>Difficulty:</b> {data.difficulty} <b>Miles:</b> {data.distance_miles} <b>Minutes:</b> {data.duration_minutes} <b>AVG Heartbeat:</b> {data.avg_heartbeat} <br /> <b>Max Heartbeat:</b> {data.max_heartbeat} <b>Type:</b> {data.workout_type} <b>MPH:</b> {data.avg_mph}</p>
                </div>
                  :
                  item === "sleeping" ? <div><h5>Sleeping</h5>
                    <p><b>Date:</b> {data.date.substr(0, 10)} <b>Laid down:</b> {data.laid_down.replace("00.000000", "")} <b>Asleep:</b> {data.asleep.replace("00.000000", "")} <b>Got up:</b> {data.got_up.replace("00.000000", "")} <br /> <b>Awake:</b> {data.awake.replace("00.000000", "")} <b>Waking heartbeat: </b>{data.waking_heartbeat}</p>
                  </div>
                    :
                    item === "fats" ? <div><h5>fats</h5>
                      <p><b>Date:</b> {data.date.substr(0, 10)} <b>Time</b> {data.time.replace(":00.000000", " ")} <b>{data.name}</b> {data.value} {data.unit} </p>
                    </div>
                      :
                      item === "protein" ? <div><h5>protein</h5>
                        <p><b>Date:</b> {data.date.substr(0, 10)} <b>Time</b> {data.time.replace(":00.000000", " ")} <b>{data.name}</b> {data.value} {data.unit} </p>
                      </div>
                        :
                        item === "carbs" ? <div><h5>carbs</h5>
                          <p><b>Date:</b> {data.date.substr(0, 10)} <b>Time</b> {data.time.replace(":00.000000", " ")} <b>{data.name}</b> {data.value} {data.unit} </p>
                        </div>
                          :
                          item === "calories" ? <div><h5>calories</h5>
                            <p><b>Date:</b> {data.date.substr(0, 10)} <b>Time</b> {data.time.replace(":00.000000", " ")} <b>{data.name}</b> {data.value} {data.unit} </p>
                          </div>
                            : null


            )
          )}
        </div >
      </Jumbotron>
    );
  }

}

export default Logs;   