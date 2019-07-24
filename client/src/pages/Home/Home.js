import React, { Component } from "react";
import LoginModal from "../../components/Forms/Login/Login"

import "./Home.css"
class Home extends Component {

  render(){

    return(<div id="home-container">
      {/* Shows the login form  */}
     <LoginModal/>
     </div>);
  }
}

export default Home;