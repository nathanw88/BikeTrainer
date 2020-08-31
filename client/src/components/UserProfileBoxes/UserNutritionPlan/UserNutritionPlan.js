import React, { Component } from "react";
import { Jumbotron, Button } from 'reactstrap';
import API from '../../../utils/API';
import "./UserNutritionPlan.css";

class UserNutritionPlan extends Component {

  constructor(props) {

    super(props);

    this.state = {
      userID: parseInt(sessionStorage.getItem("id")),
      userNutritionPlan: {},
      userNutritionPlanData: []

    };
  };

  componentDidMount = () => {
    if (!sessionStorage.getItem("id")) {
      window.location.replace("/")
    };
    API.getUserNutritionPlan(this.state.userID).then((result) => {
      let { userNutritionPlan, userNutritionPlanData } = this.state;
      userNutritionPlanData = [...result.data.nutritionPlanData];
      userNutritionPlan = result.data.nutritionPlan;
      this.setState({ userNutritionPlan, userNutritionPlanData });

    }).catch(error => {
      alert(error.response.data.message);
      if (error.response.data.message === "Your session has expired.") {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("id", "");
        window.location.replace("/");
      };
    });
  };

  delete = () => {
    let { userNutritionPlan } = this.state;
    console.log(userNutritionPlan)
    API.deleteNutritionPlan(userNutritionPlan.id, this.state.userID).then((result) => {
      window.location.replace("/nutrition_plan");
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
    const { userNutritionPlanData, userNutritionPlan } = this.state;

    return (<Jumbotron id="UserNutritionPlan-box" className="profile-box">

      {userNutritionPlanData.length >= 0 ?
        <div>
          <h1 className="text-center">{userNutritionPlan.name}</h1>
          <h4>Description:</h4>
          <h5 className="indent">{userNutritionPlan.description}</h5>
          <br />
          <br />
          {userNutritionPlanData.map((nutrition, i) =>
            <div key={i}>
              <h4> <span id="nutrient-name">{nutrition.name}:</span> {nutrition.amount} {nutrition.unit}</h4>
              <br />
            </div>)
          }
          <br />
        </div> : <div></div>}

      <Button onClick={this.delete}>Delete</Button>

    </Jumbotron>);
  }
}

export default UserNutritionPlan;