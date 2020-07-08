import React from 'react';
import {Form ,Button,InputGroup, Col, Row, Container, Alert, Image} from 'react-bootstrap'




export default function About(){
    return(
        <div>
            <div className="aboutjumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-1 text-white">About Us</h1>
                {/* <p className="lead text-white">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p> */}
            </div>
            </div>
            
            <Container fluid className="pt-xl-5" >
                
            <Row > 
            <Col md={{ span: 11, offset: 2 }} className="mx-auto pt-xl-4 rounded-xl">
            <Row style={{backgroundColor: '#F0F6FF'}} className='shadow rounded'>
                <Col className="row justify-content-md-center align-items-center p-xl-5" >
                    <Image src="/aboutus.jpg" fluid rounded/>
                </Col>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <h2 className="text-center">Create your account</h2>
                </Col>
            </Row>
            <Row>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <h2 className="text-center">Create your account</h2>
                </Col>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <Image src='/logo192.png' />
                </Col>
            </Row>
            <Row style={{backgroundColor: '#F0F6FF'}} className='shadow rounded'>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <Image src='/logo192.png' />
                </Col>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <h2 className="text-center">Create your account</h2>
                </Col>
            </Row>
            <Row>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <h2 className="text-center">Create your account</h2>
                </Col>
                <Col className="row justify-content-md-center align-items-center p-xl-5">
                    <Image src='/logo192.png' />
                </Col>
            </Row>
            </Col>
            </Row>

            </Container>
        </div>
    )
}