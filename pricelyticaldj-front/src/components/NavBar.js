import React from 'react';
import axios from 'axios'
import { Navbar,Nav,NavDropdown, Button,Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import {SERVER_ADDRESS} from "../constants/config"



export default function NavBar(props){
    // const [logedOut, setLogedOut] = useState(!props.logedin)
    const logoutUser = () => {
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }    
          } 
          axios.get(SERVER_ADDRESS + 'accounts/logout/', options).then(response => {
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            props.setloged(false)
            console.log("logedin :",props.logedin);
          }).catch((error) =>{
            
           
            console.log("Have an error");
              });
        
    }
    

    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className='shadow' >
            <Col>
                <Navbar.Brand href="/">
                    <h3>
                        Pricelytical 
                        <small className='text-muted'>
                            {' '}A Competition analysis tool
                        </small>
                    </h3>
                </Navbar.Brand>
            </Col>
            <Col className="align-self-center">
                <Row className='justify-content-center'>
                    <Link to='/analysis/create'>
                        <Button className= "btn-dark btn-outline-light rounded-0" type="button">Create Analysis</Button>
                    </Link>
                </Row>

            </Col>
            <Col>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ml-auto'>
                    <Nav.Link href="/about">
                        About
                    </Nav.Link>
                    <Nav.Link href="/pricing">
                        Pricing
                    </Nav.Link>
                    <Nav.Link href="/contact">
                        Contact
                    </Nav.Link>
                    {localStorage.getItem('access_token') !== null && <NavDropdown alignRight className='a text-primary' title={props.user.toUpperCase()} id="dropdown-menu-align-right">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/analysis/list">Analysis Repository</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logoutUser} className='text-danger'>Log Out</NavDropdown.Item>
                    </NavDropdown>}
                    {localStorage.getItem('access_token')===null   && <Nav.Link href="/login">
                                            Log In
                                        </Nav.Link>}
                    {localStorage.getItem('access_token')===null   && <Nav.Link href="/signup">
                                        Sign Up
                                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Col>
        </Navbar>
    )
}