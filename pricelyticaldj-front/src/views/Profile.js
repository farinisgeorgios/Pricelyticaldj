import React, { useState, useEffect } from 'react'
import { Container,Row, Col,Button, Form } from 'react-bootstrap'
import {FaUsers,FaListUl, FaMoneyCheck} from 'react-icons/fa'
import { IconContext } from "react-icons";
import {SERVER_ADDRESS} from "../constants/config"
import axios from 'axios'



export default function Profile(props){

    const [resp, setResp] = useState({
        data: {},
        came: false
    })

    useEffect(() => {
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }    
        }
        
        axios.get(SERVER_ADDRESS + 'profile/',options)
            .then(response => {
                setResp({
                    data : response.data,
                    came : true})
                
            })
            .catch((error) =>{
              console.log("Have an error");
            })
        
    },[])

    return(
        
        <Container className='p-xl-5'>
            
            <h1><strong>Profile</strong></h1>
            
            <div className='pt-xl-4'>
                <Row className=' rounded shadow'>
                    <Col>
                        <div className='p-xl-3' title='User'>
                            <IconContext.Provider value={{ size:'1.25em' ,color: "#343A40", className: "global-class-name" }}>
                                <FaUsers/>  User: {props.user.username.toUpperCase()} 
                            </IconContext.Provider>
                        </div>
                    </Col>
                    <Col>
                        <div className="col-md-4 ml-auto p-xl-2">
                            <Button href='/analysis/list' className='btn-primary'><FaListUl/>{'  '}Analysis List</Button>
                        </div>
                        
                    </Col>
                </Row>
            </div>
            
            <div className='pt-xl-4 '>
                <div className='shadow-sm p-xl-3'>
                    <Row className='justify-content-start  align-items-end'>
                        <Col className='col-md-4 '>
                            
                            <h5>Account</h5>
                        </Col>
                        <Col className='col-md-4'>
                           
                            <h3>{props.user.first_name} {props.user.last_name}</h3>
                            
                        </Col>
                    </Row>
                    <hr/>
                    <Row className='pt-xl-3'>
                        <Col className='col-md-4 '>
                            <Form.Label>Username:</Form.Label>
                        </Col>
                        <Col className='col-md-4'>
                            <Form.Control placeholder={props.user.username} readOnly/>
                        </Col>
                    </Row>
                    <Row className='pt-xl-3'>
                        <Col className='col-md-4 '>
                            <Form.Label>First Name:</Form.Label>
                        </Col>
                        <Col className='col-md-4'>
                            <Form.Control placeholder={props.user.first_name} readOnly/>
                        </Col>
                    </Row>
                    <Row className='pt-xl-3'>
                        <Col className='col-md-4 '>
                            <Form.Label>Last Name:</Form.Label>
                        </Col>
                        <Col className='col-md-4'>
                            <Form.Control placeholder={props.user.last_name} readOnly/>
                        </Col>
                    </Row>
                    <Row className='pt-xl-3'>
                        <Col className='col-md-4 '>
                            <Form.Label>Email:</Form.Label>
                        </Col>
                        <Col className='col-md-4'>
                            <Form.Control placeholder={props.user.email} readOnly/>
                        </Col>
                    </Row>
                    <Row className='pt-xl-5'>
                        <Col className='col-md-4 '>
                            <Form.Label>Hotel Based Searches Remaining:</Form.Label>
                        </Col>
                        <Col className='col-md-1'>
                            <Form.Control placeholder={resp.came ? String(resp.data[0].hotelBased_searches) : "0"} readOnly/>
                        </Col>
                        
                        <Col className='col-md-3'>
                            <Form.Label>
                                <IconContext.Provider value={{ size:'1em' ,color: "#0069D9", className: "global-class-name" }}>
                                    <FaMoneyCheck/> 
                                </IconContext.Provider> 
                                {'  '}Last purchase on {resp.came ? String(resp.data[0].last_hotelBased_purchase.slice(0,10)) : ""} 
                                </Form.Label>
                        </Col>
                    </Row>
                    <Row className='pt-xl-3'>
                        <Col className='col-md-4 '>
                            <Form.Label>Perimeter Based Searches Remaining:</Form.Label>
                        </Col>
                        <Col className='col-md-1'>
                            <Form.Control placeholder={resp.came ? String(resp.data[0].perimeterBased_searches) : "0"} readOnly/>
                        </Col>
                        <Col className='col-md-3'>
                            <Form.Label>
                                <IconContext.Provider value={{ size:'1em' ,color: "#0069D9", className: "global-class-name" }}>
                                    <FaMoneyCheck/> 
                                </IconContext.Provider>
                            {'  '}Last purchase on {resp.came ? String(resp.data[0].last_perimeterBased_purchase.slice(0,10)) : ""} 
                            </Form.Label>
                        </Col>
                    </Row>
                    
                </div>
            </div>
            
            
        </Container>
        
    )
}