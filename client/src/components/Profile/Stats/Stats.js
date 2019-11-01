import React, { Component } from "react";
import { Jumbotron } from 'reactstrap';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state={}
  };

dailyNutrientAvg(subject){
  let total = 0
  let days = []
  let data = []
  let avg = 0

  this.props.nutrient.data.map((res)=>{
    if (res.name === subject){
      console.log(res)
      data.push(res)
      total += res.value
      if(!days.includes(res.date.substr(0, 10))){
        days.push(res.data.substr(0, 10))
        console.log(days)

      }
    }
  })

}

 

  render() {

    this.dailyNutrientAvg(1, "Energy")
    return (



      <Jumbotron id="profile-jumbotron">
      <div id="data-container">{
        <h1>Page under constuction.</h1>
        // this.props.statsSelected.map((item) =>

        //   <div></div>

                    
        //   )
        
           }
      </div>
      </Jumbotron>
    );
  }
}

export default Logs;
