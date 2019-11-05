import React, { Component } from "react";
import { Jumbotron } from 'reactstrap';
import Plot from 'react-plotly.js';

class Graph extends Component {
  constructor(props) {
    super(props);



    this.state = {


      data: [],
      layout: {},
      frames: [],
      config: {},

    }


  }


 componentDidMount(){
   this.buildPlot()
 }
  componentWillReceiveProps(prevProps) {

    this.buildPlot()

  }

  buildPlot() {
    var trace1 = {
      x: [],
      y: [],
      name: '',
      type: 'scatter'
    };

    var trace2 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace3 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace4 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    };

    var trace5 = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter'
    }
    for (var i = 0; i < this.props.graphSelected.length; i++) {
      var selected = this.props.graphSelected[i].split(".")
      for (var j = 0; j < this.props[selected[0]].length; j++) {
        switch (i) {
          case 0:
            trace1.x.push(this.props[selected[0]][j].date)
            trace1.y.push(this.props[selected[0]][j][selected[1]])
            trace1.name = selected[1]
            trace1.yaxis = selected[1]
            break;
          case 1:
            trace2.x.push(this.props[selected[0]][j].date)
            trace2.y.push(this.props[selected[0]][j][selected[1]])
            trace2.name = selected[1]
            trace2.yaxis = selected[1]
            break;
          case 2:
            trace3.x.push(this.props[selected[0]][j].date)
            trace3.y.push(this.props[selected[0]][j][selected[1]])
            trace3.name = selected[1]
            trace3.yaxis = selected[1]
            break;
          case 3:
            trace4.x.push(this.props[selected[0]][j].date)
            trace4.y.push(this.props[selected[0]][j][selected[1]])
            trace4.name = selected[1]
            trace4.yaxis = selected[1]
            break;
          case 4:
            trace5.x.push(this.props[selected[0]][j].date)
            trace5.y.push(this.props[selected[0]][j][selected[1]])
            trace5.name = selected[1]
            trace5.yaxis = selected[1]
            break;
          default:
            console.log("Error building plot data")
        }
      }
    }
    this.state.data.push(trace1, trace2, trace3, trace4, trace5)
    while (this.state.data.length > 5) {
      this.state.data.splice(0, 1)
    }
    this.setState({ data: [...this.state.data] });

    console.log(this.state)
    console.log(this.props)
  }

  render() {


    return (




      <Jumbotron id="profile-jumbotron">

        <div>
          <Plot
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            config={this.state.config}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
          />
        </div>


      </Jumbotron>

    );
  }
}

export default Graph;