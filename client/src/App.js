import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar/Navbar";
import Log from "./pages/Log/Log";
import Profile from "./pages/Profile/Profile";
import NutritionPlan from './pages/NutritionPlan/NutritionPlan';
import Setup from './pages/Setup/Setup';
import UserProfile from "./pages/UserProfile/UserProfile";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/log" component={Log} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/nutrition_plan" component={NutritionPlan} />
            <Route exact path="/setup" component={Setup} />
            <Route exact path="/user_profile" component={UserProfile}/>

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
