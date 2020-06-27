import React from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';

export default function NavBar(){
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
            <NavDropdown title="User" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/analysis/list">Analysis Repository</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout" className='text-danger'>Log Out</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/signup">
                Sign Up
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}