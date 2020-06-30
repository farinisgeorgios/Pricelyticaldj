import React from 'react';
import axios from 'axios'
import { Navbar,Nav,NavDropdown, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import {SERVER_ADDRESS} from "../constants/config"



export default function NavBar(props){
    // const [logedOut, setLogedOut] = useState(!props.logedin)
    const logoutUser = () => {
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`
            }    
          } 
          axios.get(SERVER_ADDRESS + 'accounts/logout/', options).then(response => {
            localStorage.removeItem('token')
            props.setloged(false)
            console.log("logedin :",props.logedin);
          }).catch((error) =>{
            
           
            console.log("Have an error");
              });
        
    }
    

    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className='shadow' >
        <Navbar.Brand href="/">
            <h3>
                Pricelytical 
                <small className='text-muted'>
                    {' '}A Competition analysis tool
                </small>
            </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <div className="mx-auto">
                <Link to='/analysis/create'>
                <Button className= "btn-dark btn-outline-light " type="button" onClick>Start Analysis</Button>
                </Link>
            </div>
            <Nav className='ml-auto'>
            <Nav.Link href="/about">
                <a>About</a>
            </Nav.Link>
            <Nav.Link href="/pricing">
                <a>Pricing</a>
            </Nav.Link>
            <Nav.Link href="/contact">
                <a>Contact</a>
            </Nav.Link>
            {props.logedin && <NavDropdown alignRight className='a text-primary' title={props.user.toUpperCase()} id="dropdown-menu-align-right">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/analysis/list">Analysis Repository</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutUser} className='text-danger'>Log Out</NavDropdown.Item>
            </NavDropdown>}
            {!props.logedin   && <Nav.Link href="/login">
                                    <a>Log In</a>
                                </Nav.Link>}
            {!props.logedin   && <Nav.Link href="/signup">
                                   <a>Sign Up</a> 
                                </Nav.Link>}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}