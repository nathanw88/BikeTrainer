import React, { Component } from "react";
import "./Profile.css";
import Daily_Macros from "../../components/Profile_Boxes/Daily_Macros/Daily_Macros";
import Average_Macros from "../../components/Profile_Boxes/Average_Macros/Average_Macros";
import Daily_Macros_Bar from "../../components/Profile_Boxes/Daily_Macros_Bar/Daily_Macros_Bar";

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
      <Daily_Macros/>
      <Average_Macros/>
      <Daily_Macros_Bar/>
    </div>)


  }
}

export default Profile