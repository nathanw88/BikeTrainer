import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import './App.css';
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar/Navbar";
import Log from "./pages/Log/Log";
import Profile from "./pages/Profile/Profile";
import Nutrition_plan from './pages/Nutrition_plan/Nutrition_plan';
import Setup from './pages/Setup/Setup';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Navbar/>
        <Switch>

          <Route exact path="/" component={Home}/>
          <Route exact path="/log" component={Log}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/nutrition_plan" component={Nutrition_plan}/>
          <Route exact path="/setup" component={Setup}/>

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
