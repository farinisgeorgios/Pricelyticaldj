import React from 'react'
import {Jumbotron, Container, Row, Button, Col, Form, Link} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';


export default function Contact(){
    return(
        <div style={{background:'#F0F6FF'}}>
            <Jumbotron fluid className='jumbotron bg-black' style={{background:'#121B2C'}}>
                <Container>
                    <Row className='justify-content-center'>
                        <h1 style={{color:'#F9F6F4'}}><strong>WE WANT TO HEAR FROM <strong style={{color:'#4DC2BE'}}>YOU</strong></strong> </h1>
                    </Row>
                    <Row className='justify-content-center p-xl-2'>
                        <h3 style={{color:'#F9F6F4'}}>Please <strong style={{color:'#4DC2BE'}}>fill out our form</strong> and we'll get in touch shortly.</h3>
                    </Row>
                </Container>
            </Jumbotron>
            <Row className='justify-content-center p-xl-5 align-items-center' >
                <Col md={4} className='shadow rounded justify-content-center bg-white' style={{color:'#0158E6'}}>
                <Form className='pt-xl-4 pb-xl-4 '>
                    <Form.Group controlId="formBasicFirst">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Full Name" />
                        
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" />
                        <Form.Text className="text-muted">
                            Your email address will not be shared.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control as="textarea" rows="1" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows="2" />
                    </Form.Group>
                    
                    <Button className='btn-outline-primary btn-light'  type="submit">
                        Send Email
                    </Button>
                    
                    
                </Form>
                </Col>
                <Col md={4} className='justify-content-center'>
                    
                    <h5>Other ways to <strong style={{color:'#4DC2BE'}}>connect</strong></h5>
                    <p>Call, email, send us a text-whatever works for you. We'll be here.</p>
                    <p>
                        <SocialMediaIconsReact  borderColor="rgba(0,0,0,0.25)" 
                                            borderWidth="1" borderStyle="solid" 
                                            icon="phone" iconColor="rgba(255,255,255,1)" 
                                            backgroundColor="rgba(77,194,190,1)" iconSize="5" 
                                            roundness="50%" url="https://some-website.com/my-social-media-url" size="27" />
                        {'   '}(+30) 6932 523 802
                    </p>
                    <hr/>
                    <p>
                        <SocialMediaIconsReact  borderColor="rgba(0,0,0,0.25)" 
                                                borderWidth="1" borderStyle="solid" 
                                                icon="mail" iconColor="rgba(255,255,255,1)" 
                                                backgroundColor="rgba(77,194,190,1)" iconSize="5" 
                                                roundness="50%" url="https://some-website.com/my-social-media-url" size="27" />
                        {'   '}<a href = {"mailto:" + "info@egrowth.gr"}> info@egrowth.gr</a>
                    </p>
                    <hr/>
                    <p>
                        <SocialMediaIconsReact  borderColor="rgba(0,0,0,0.25)" 
                                                borderWidth="1" borderStyle="solid" 
                                                icon="facebook" iconColor="rgba(255,255,255,1)" 
                                                backgroundColor="rgba(77,194,190,1)" iconSize="5" 
                                                roundness="50%" url="https://some-website.com/my-social-media-url" size="27" />
                        {'   '}<a href = 'https://www.facebook.com/internetgrowth/'> Egrowth Digital Marketing Agency</a>
                    </p>


                    
                   
                    

                </Col>

            </Row>
        </div>
    )
}