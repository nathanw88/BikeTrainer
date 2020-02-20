import React, { Component } from "react";

import Food from "../../components/Forms/Food/Food"
import "./Log.css"
class Log extends Component {


  render(){

    return(<div id="log-container">
    {/* Directs you to the correct page based off which button you clicked on navbar currently using local storage to keep track of what was clicked */}
      {localStorage.getItem("log")=== "food"? <Food/>: <div>error</div> }
     </div>);
  }
}

export default Log;