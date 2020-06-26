import React, {useState, useEffect} from 'react';
import {Form ,Button,Container,Row, Col} from 'react-bootstrap'
import axios from 'axios'
import UserForm from "../components/UserForm"

export default function Login(){
    const[username, setUsername] = React.useState("");
    const[password, setPassword] = React.useState("");
    function handleSubmit(event){
        event.preventDefault();
        const url = "http://127.0.0.1:8000/"
        const data = {username : username,
                password : password}
        const options = {
            headers: {Authorization : localStorage.getItem('token')}}
        axios.defaults.headers.common['Authorization'] = 
            'Bearer ' + localStorage.getItem('jwtToken');
        axios.post(url+ 'accounts/login',data).then((res) => {console.log(res);})
        
        
        console.log("done",data)
    }
    return(
        <Container fluid className="pt-xl-5 mx-auto" >
            <Row > 
            <Col md={{ span: 4, offset: 2 }} className="justify-content-md-center shadow p-xl-5 mx-auto">
            <Row><h2 className="text-center">Please Log In</h2></Row>
            <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={e=> setUsername(e.target.value)} type="username" placeholder="Enter username" />
                <Form.Text className="text-muted">
                We'll never share your username with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e=> setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
                Log In
            </Button>
            </Form>
            </Col>
            </Row>
        </Container>
    
    ) 
}