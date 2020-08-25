import React, { Component } from "react";
import UserNutritionPlan from "../../components/UserProfileBoxes/UserNutritionPlan/UserNutritionPlan";
import UserPersonalInfo from "../../components/UserProfileBoxes/UserPersonalInfo/UserPersonalInfo";
import UserMeasurements from "../../components/UserProfileBoxes/UserMeasurements/UserMeasurements"
import "./UserProfile.css";

class UserProfile extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: parseInt(sessionStorage.getItem("id"))
    };
  };

  componentDidMount = () => {
    console.log("here")
    if(!sessionStorage.getItem("id")){
      alert("Please Login") 
      window.location.replace("/")
    };
  };

 

  render() {

    return (<div id="user-profile-container">
      <UserNutritionPlan/>
      <UserMeasurements/>
      <UserPersonalInfo/>
    </div>);
  }
}

export default UserProfile;