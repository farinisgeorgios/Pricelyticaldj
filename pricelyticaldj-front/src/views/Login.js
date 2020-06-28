import React, {useState} from 'react';
import {Form ,Button,Container,Row, Col, Alert} from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from "react-router-dom";
const apiUrl = 'http://127.0.0.1:8000/';



  
export default function Login(props){
    const[username, setUsername] = React.useState("");
    const[password, setPassword] = React.useState("");
    const storedJwt = localStorage.getItem('token');
    const [jwt, setJwt] = useState(storedJwt || null);
    const [redirect, setRedirect] = useState({  redirect: false,
                                                path: "",
                                                msg: ""
                                            });

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data ={username : username,
                    password : password}
        
        // fetch(apiUrl + 'accounts/login/', {
        //     method: 'POST',
        //     headers:{
        //         Accept: 'application/json',
        //                 'Content-Type': 'application/json',
                        
        //     },
        //     body: JSON.stringify({username: username, password: password})
        // })
        //     .then(res => res.json());
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
            }    
        } 

        axios.post(apiUrl + 'accounts/login/', data, options).then(response => {
            localStorage.setItem('token', response.data.token);
            setJwt(response.data.token)
            setRedirect({
                redirect: true,
                path : "/",
                msg : "Loged in successfully!"
            })
            props.setloged(true)
            console.log("done",response.data,jwt,redirect);
        }).catch((error) =>{
            setRedirect({
                redirect: false,
                path : "",
                msg : "Wrong Username or Password. Pleasy try again!"
            })
            console.log("Have an error");
                
        });
    }


    // REDIRECT HERE *********************************************
    if (redirect.redirect) {
        return <Redirect to= {redirect.path}
        />
        
    }else{
    
    return(
        <Container fluid className="pt-xl-5 mx-auto rounded" >
            <Row > 
            <Col md={{ span: 4, offset: 5 }} className="justify-content-md-center shadow mx-auto pt-xl-4 rounded">
            <Row>
                <Col className="justify-content-md-center ">
                <h2 className="text-center">Please Log In</h2>
                </Col>
            </Row>
            <Row>
                <Col className='p-xl-4'>
                    {redirect.msg && redirect.redirect===false && <Alert variant='danger' >{redirect.msg}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={e=> setUsername(e.target.value)} value={username} type="username" placeholder="Enter username" />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" block>
                        Log In
                    </Button>
                    <p class="text-secondary">
                        Don't have an account?{' '}
                        <a href="/signup" class="text-primary">Sign Up</a> 
                    </p>
                    
                    </Form>
            </Col>
            </Row>
            </Col>
            </Row>
        </Container>
    
    ) 
    }
}