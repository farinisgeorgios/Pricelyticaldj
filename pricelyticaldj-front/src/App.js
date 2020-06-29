import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import NavBar from './components/NavBar'
import MyFooter from './components/MyFooter'
import SignUp from './views/SignUp'
import Pricing from './views/Pricing'
import Analysis_list from './views/Analysis_list'
import {SERVER_ADDRESS} from "./constants/config"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
const apiUrl = 'http://127.0.0.1:8000/';


function App() {
  const [logedin, setLogedin] = useState(true)
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

  useEffect(  () =>  {
    const options = {
      headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`
      }    
    } 
    
    axios.get(SERVER_ADDRESS + 'accounts/current-user/', options).then(response => {
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
          <Route exact path="/"><Home /></Route>
          <Route path="/about" ><About /></Route>
          <Route path="/pricing" ><Pricing /></Route>
          <Route path="/login"><Login setloged={LogSet}/></Route>
          <Route path="/signup"><SignUp/></Route>
          <Route path="/analysis/list" render={() => logedin ? (<Analysis_list/>) : (<Redirect to='/login'/>)}/>
            
          
          <Route path="/profile">
            <h1>
              Profile Page
            </h1>
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
