import React, { Component } from "react";
import "./Profile.css";
import Daily_Macros from "../../components/Profile_Boxes/Daily_Macros/Daily_Macros";
import Average_Macros from "../../components/Profile_Boxes/Average_Macros/Average_Macros";

class Profile extends Component {

  constructor(props) {

    super(props);

    this.state = {

      fk_user: sessionStorage.getItem("id"),

    }
  }


  render() {

    return(<div id="profile-container">
      <Daily_Macros/>
      <Average_Macros/>
    </div>)


  }
}

export default Profile