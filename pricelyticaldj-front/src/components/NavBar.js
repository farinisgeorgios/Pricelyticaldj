import React from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';

export default function NavBar(){
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className='shadow' >
        <Navbar.Brand href="/">Pricelytical</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            
            </Nav>
            <Nav>
            <NavDropdown title="User" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/analysis/list">Analysis Repository</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout" className='text-danger'>Log Out</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/register">
                Sign Up
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}