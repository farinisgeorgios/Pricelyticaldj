import React, {useState} from 'react';
import {Form ,Button,InputGroup, Col, Row, Container, Alert} from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from "react-router-dom";

import {SERVER_ADDRESS} from "../constants/config"


export default function SignUp(){
    const [validated, setValidated] = useState(false);
    const [passMatch, setpassMatch] = useState(true);
    const [password1, setPass1] = useState("")
    const [password2, setPass2] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [first_name, setFirstname] = useState("")
    const [last_name, setLastname] = useState("")
    
    const [redirect, setRedirect] = useState({  redirect: false,
        path: "",
        msg: ""
    });
  

    const handleSubmit = (event) => {
        const data =    {   username : username,
                            password: password1,
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                        };
        const form = event.currentTarget;
        event.preventDefault();
        if (password1!==password2){
            setpassMatch(false)
        
        }else if (form.checkValidity() === false) {
           
            event.stopPropagation();
            setValidated(true);
            
        }else{
            setpassMatch(true)
            
            const options = {
                headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                }    
            } 
            axios.post(SERVER_ADDRESS + 'accounts/signup/', data, options).then(response => {
                
                setRedirect({
                    redirect: true,
                    path : "/login",
                    msg : "Account Created"
                })
            }).catch((error) =>{
                setRedirect({
                    redirect: false,
                    path : "",
                    msg : "Username already exists!"
                })
                console.log("Have an error");
                    
            });
        }
    };

    if (redirect.redirect) {
        return (
        <Redirect
            to= {redirect.path}
        />
        );
    }else{
  
    return (
        <Container fluid className="pt-xl-5" >
            <Row > 
            <Col md={{ span: 5, offset: 2 }} className="justify-content-md-center shadow mx-auto pt-xl-4 rounded">
            <Row>
                <Col>
                <h2 className="text-center">Create your account</h2>
                </Col>
            </Row>
            <Row>
                <Col className='p-xl-4 justify-content-md-center'>
                {redirect.msg && redirect.redirect===false && <Alert variant='danger' >{redirect.msg}</Alert>}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="5" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                            <Form.Control
                                onChange={e=> setUsername( e.target.value)}
                                type="username"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                className="rounded"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="5" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                            onChange = {e=> setFirstname( e.target.value)}
                            type="text"
                            placeholder="First name"
                            
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                            onChange = {e=> setLastname( e.target.value)}
                            type="text"
                            placeholder="Last name"
                            
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Label>Email Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                onChange = {e=> setEmail( e.target.value)}
                                type="text"
                                placeholder="user@example.com"
                                aria-describedby="inputGroupPrepend"
                                required
                                className="rounded"
                                />
                                <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control   onChange={e=> setPass1(e.target.value)} value={password1} type="password" 
                                            
                                            placeholder="Password" 
                                            required />
                            <Form.Control.Feedback type="invalid">
                            Enter a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={e=> setPass2(e.target.value)} value={password2} type="password" placeholder="Password" isValid={password1 !== "" && password2===password1} required/>
                            {!passMatch && <p className='text-danger'><small>Please insert the correct password</small></p>}
                            
                        </Form.Group>
                    </Form.Row>
                        <Form.Row className=" float-right">
                            <Button type="submit" >Create Account</Button>
                        </Form.Row>
                    </Form>
            </Col>
            </Row>
            </Col>
            </Row>
        </Container>
    );
  }
}