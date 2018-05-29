import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './login.jsx';
import './App.css';
import NavBar from './NavBar.jsx';
import { PrivateRoute } from "./PrivateRoute.jsx";
import {isLoggedIn} from './auth.js';

const Home = ()=> <h3>Logged in as {localStorage.getItem("username")}</h3>

export default class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <NavBar/>
          <PrivateRoute exact isloggedin={isLoggedIn()} path="/" component={Home} />
          <Route exact path="/login" component={Login} />
      </div>
    </Router>
      )
  }
}