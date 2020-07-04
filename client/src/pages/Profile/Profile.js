import React, { Component } from "react";
import "./Profile.css";
import DAILY_NUTRIENTS from "../../components/Profile_Boxes/DAILY_NUTRIENTS/DAILY_NUTRIENTS";
import AVERAGE_NUTRIENTS from "../../components/Profile_Boxes/AVERAGE_NUTRIENTS/AVERAGE_NUTRIENTS";
import DAILY_NUTRIENTS_BAR from "../../components/Profile_Boxes/DAILY_NUTRIENTS_BAR/DAILY_NUTRIENTS_BAR";
import NUTRIENTS_TIMELINE from "../../components/Profile_Boxes/NUTRIENTS_TIMELINE/NUTRIENTS_TIMELINE";
import FOOD_LOGS from "../../components/Profile_Boxes/FOOD_LOGS/FOOD_LOGS"

class Profile extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: sessionStorage.getItem("id"),

    }
  }

  componentDidMount(){
    if(!sessionStorage.getItem("id")){
      alert("Please Login") 
      window.location.replace("/")
    };
  }

  render() {

    return(<div id="profile-container">
      <DAILY_NUTRIENTS/>
      <AVERAGE_NUTRIENTS/>
      <FOOD_LOGS/>
      <NUTRIENTS_TIMELINE/>
      <DAILY_NUTRIENTS_BAR/>
    </div>)


  }
}

export default Profile