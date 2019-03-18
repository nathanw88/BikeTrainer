import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import './App.css';
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar.js";
import Log from "./pages/Log/Log";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Navbar/>
        <Switch>

          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/log" component={Log}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
