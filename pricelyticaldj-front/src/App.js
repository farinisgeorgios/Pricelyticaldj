import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Container} from 'react-bootstrap'
import './App.css';
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import NavBar from './components/NavBar'
import MyFooter from './components/MyFooter'
import SignUp from './views/SignUp'
import Pricing from './views/Pricing'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
Redirect} from "react-router-dom"
const apiUrl = 'http://127.0.0.1:8000/';

function App() {
  const [logedin, setLogedin] = useState(false)
  const [user, setUser] = useState({
                                    id: "",
                                    username : "",
                                    email: "",
                                    first_name: "",
                                    last_name: "",
                                  })

  const LogSet = (bool) => {
    setLogedin(bool)
  }

  useEffect(() => {
  const options = {
    headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`
    }    
  } 

  axios.get(apiUrl + 'accounts/current-user/', options).then(response => {
    setUser({
      id: response.data.id,
      username : response.data.username,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
    })
    setLogedin(true)
    console.log("done",response.data,user);
  }).catch((error) =>{
    setLogedin(false)
    
    console.log("Have an error");
        
      });
  
},[logedin])


  return (
    
      <div className='relative'>
      <Router>
      <NavBar setloged={LogSet} logedin={logedin} user={user.username}/>
        <Switch>
          <Route exact path="/" render={() => (logedin ?  (<Home />) : 
                                                              (<Home />))}/>
                                                              {/* (<Redirect to="/login"/>) */}
          <Route path="/about" render={() => (logedin ?  (<About />) : 
                                                              (<About />))}/>
          <Route path="/pricing" render={() => (logedin ?  (<Pricing />) : 
                                                              (<Pricing />))}/>
            
          
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
          <Route path="/login"><Login setloged={LogSet}/></Route>
          <Route path="/signup"><SignUp/></Route>
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
