import React from 'react';
import axios from 'axios'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';

const apiUrl = 'http://127.0.0.1:8000/';



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
          axios.get(apiUrl + 'accounts/logout/', options).then(response => {
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
            <Nav className='ml-auto'>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {props.logedin && <NavDropdown alignRight className='text-primary' title={props.user.toUpperCase()} id="dropdown-menu-align-right">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/analysis/list">Analysis Repository</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutUser} className='text-danger'>Log Out</NavDropdown.Item>
            </NavDropdown>}
            {!props.logedin   && <Nav.Link href="/login">Log In</Nav.Link>}
            {!props.logedin   && <Nav.Link href="/signup"> Sign Up</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}