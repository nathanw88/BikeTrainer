import React, { Component } from "react";
import "./Profile.css";
import DailyNutrients from "../../components/Profile_Boxes/DailyNutrients/DailyNutrients";
import AverageNutrients from "../../components/Profile_Boxes/AverageNutrients/AverageNutrients";
import DailyNutrientsBar from "../../components/Profile_Boxes/DailyNutrientsBar/DailyNutrientsBar";
import NutrientsTimeline from "../../components/Profile_Boxes/NutrientsTimeline/NutrientsTimeline";
import FoodLogs from "../../components/Profile_Boxes/FoodLogs/FoodLogs";

class Profile extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: sessionStorage.getItem("id"),

    }
  }

  componentDidMount(){
    if(!sessionStorage.getItem("id")){
      alert("Please Login") ;
      window.location.replace("/");
    };
  }

  render() {

    return(<div id="profile-container">
      <DailyNutrients/>
      <AverageNutrients/>
      <FoodLogs/>
      <NutrientsTimeline/>
      <DailyNutrientsBar/>
    </div>)


  }
}

export default Profile