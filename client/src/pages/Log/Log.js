import React, { Component } from "react";
import Biking from "../../components/Forms/Biking/Biking"
import Running from "../../components/Forms/Running/Running"
import Sleeping from "../../components/Forms/Sleeping/Sleeping"
import Food from "../../components/Forms/Food/Food"
import "./Log.css"
class Log extends Component {


  render(){

    return(<div id="log-container">
      {localStorage.getItem("log")=== "bike"? <Biking/>:localStorage.getItem("log")=== "run"? <Running/>:localStorage.getItem("log")=== "sleep"? <Sleeping/>:localStorage.getItem("log")=== "food"? <Food/>: <div>error</div> }
     </div>);
  }
}

export default Log;