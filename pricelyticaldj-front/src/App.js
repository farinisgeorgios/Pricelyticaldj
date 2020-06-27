import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap'
import './App.css';
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import NavBar from './components/NavBar'
import MyFooter from './components/MyFooter'
import SignUp from './views/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom"


function App() {
  return (
    
      <div className='relative'>
      <Router>
      <NavBar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/about"><About/></Route>
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
          <Route path="/login"><Login/></Route>
          <Route path="/logout">
            <h1>
              Logout Page
            </h1>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
        <div className="pt-xl-5 relative-bottom">
          <div className='shadow'>
            <MyFooter/>
          </div>
        </div>
      
      </Router>
      
      </div>
  );
}

export default App;
