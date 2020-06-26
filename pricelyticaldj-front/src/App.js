import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap'
import './App.css';
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom"


function App() {
  return (
    
      
      <Router>
      <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/pricing">
            <h1>
              Pricing Page
            </h1>
          </Route>
          <Route path="/profile">
            <h1>
              Profile Page
            </h1>
          </Route>
          <Route path="/analysis/list">
            <h1>
              Analysis List Page
            </h1>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/logout">
            <h1>
              Logout Page
            </h1>
          </Route>
          <Route path="/register">
            <h1>
              Sign up page
            </h1>
          </Route>
        </Switch>

      </Router>
      
    
  );
}

export default App;
