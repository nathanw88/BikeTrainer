import React, { Component } from "react";
import LoginModal from "../../components/Forms/Login/Login"
import {Container} from "reactstrap"
import "./Home.css"
class Home extends Component {

  render(){

    return(<div id="home-container">
      
     <LoginModal/>
     </div>);
  }
}

export default Home;