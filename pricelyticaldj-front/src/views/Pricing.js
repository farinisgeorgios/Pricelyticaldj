import React ,{useState} from 'react';
import {Button,Card, Container, Jumbotron, Row, Col, Alert, Text} from 'react-bootstrap'
import axios from 'axios'
import {SERVER_ADDRESS} from "../constants/config"
import { Redirect } from "react-router-dom";


export default function Pricing(){
    const [redirect, setRedirect] = useState({  redirect: false,
        path: "",
        msg: ""
    });

    function HandleBuy(hotelSearches,perimeterSearches) {
        const data = {
            hotelBased_searches : hotelSearches,
            perimeterBased_searches : perimeterSearches,
        }
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }    
        }

        axios.post(SERVER_ADDRESS + 'profile/set/searches/', data, options).then(response => {
                
            setRedirect({
                redirect: true,
                path : "/analysis/create",
                msg : "Account Created"
            })
        }).catch((error) =>{
            setRedirect({
                redirect: false,
                path : "",
                msg : "Could not complete the purchase!"
            })
            console.log("Have an error completing the purchase.");
                
        });
    }


    if (redirect.redirect) {
        return (
        <Redirect
            to= {redirect.path}
        />
        );
    }else{
    return(
        // TODO buttons redirect and api call to insert analysis searches
        <div style={{background:'#F0F6FF'}}>
            <Jumbotron fluid className='jumbotron bg-black' style={{background:'#121B2C'}}>
                <Container>
                    <Row className='justify-content-center'>
                        <h1 style={{color:'#4DC2BE'}}><strong>TRY FREE FOR 20 SEARCHES</strong> </h1>
                    </Row>
                    <Row className='justify-content-center p-xl-2'>
                        <h3 style={{color:'#F9F6F4'}}>Easy purchase Hotel-Based or Perimeter-Based Searches.</h3>
                    </Row>
                    <Row className='justify-content-center pt-xl-5'>
                        <a href='/signup'>
                        <Button className= "btn-info btn-outline-light rounded-0 btn-lg">START FOR FREE</Button>
                        </a>
                    </Row>
                </Container>
            </Jumbotron>
            <Row className='justify-content-center align-items-center' >
            {redirect.msg && redirect.redirect===false && <Alert variant='danger' >{redirect.msg}</Alert>}
            </Row>
            <Row className='justify-content-center align-items-center' >
                <Col className="col-3 justify-content-center pt-xl-5 pb-xl-5" >
                    <Card className="rounded-0 shadow-sm">
                        <Card.Body >
                            <Row className='justify-content-center p-xl-3'>
                                <Card.Title>ANALYZE <strong style={{color:'#4DC2BE'}}>HOTELS</strong></Card.Title>
                            </Row>
                            <Row className='justify-content-center pt-xl-3'>
                                <Card.Title>
                                
                                <span style={{"font-size":"3em"}}class="price">
                                    <span style={{"font-size":".5em","vertical-align":"top"}}>€</span>
                                    <strong>200</strong>
                                    <span style={{"font-size":".2em","vertical-align": "super"}}>/50 Hotel Analyses</span>
                                </span>
                                    
                                </Card.Title>
                            </Row>
                            <Row className='justify-content-center'>
                                <span style={{"font-size":"0.7em"}}>Purchased analyses has an expiration date of one year. </span>
                            </Row>
                            <Row className='justify-content-center pt-xl-4'>
                                <Button onClick={()=>HandleBuy(50,0)} className="rounded-0 btn-light btn-outline-info" variant="primary">BUY NOW</Button>
                            </Row>                    
                        </Card.Body>
                    </Card>
                    <Row className='justify-content-center pt-xl-5' style={{"font-size":"0.7em"}}>
                        <span><strong>Hotels</strong> plan provides everything you need to</span>
                        <span>analyze your competition's prises and </span>
                        <span>accomodation utilities.</span>
                        <span>Also, 24/7 technical support is provided to fulfill </span>
                        <span>your needs on competition analysis.</span>
                    </Row>
                </Col>
                <Col className="col-4 justify-content-center pt-xl-4 pb-xl-3" >
                    
                   
                    <Card className="rounded-0 shadow">
                        <Card.Header style={{color:'#4DC2BE',background:'#121B2C'}} ><strong>MOST POPULAR</strong></Card.Header>
                        <Card.Body>
                            <Row className='justify-content-center p-xl-3'>
                                <Card.Title ><strong style={{color:'#354E64'}}>COMBINED PLAN</strong></Card.Title>
                            </Row>
                            <Row className='justify-content-center pt-xl-3'>
                                <Card.Title>
                                
                                <span style={{"font-size":"3em"}}class="price">
                                    <span style={{"font-size":".5em","vertical-align":"top"}}>€</span>
                                    <strong>350</strong>
                                    <span style={{"font-size":".2em","vertical-align": "super"}}>/50 Hotel & Perimeter Analyses</span>
                                </span>
                                    
                                </Card.Title>
                            </Row>
                            <Row className='justify-content-center'>
                                <span style={{"font-size":"0.7em"}}>Purchased analyses has an expiration date of two years. </span>
                            </Row>
                            <Row className='justify-content-center pt-xl-5'>
                                <Button onClick={()=>HandleBuy(50,50)} className="rounded-0 btn-light btn-outline-info" variant="primary">BUY NOW</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row className='justify-content-center pt-xl-5' style={{"font-size":"0.7em"}}>
                        <span><strong>Combined</strong> plan provides everything you need to</span>
                        <span>find your competition in a given perimeter and</span>
                        <span>analyze their prises and </span>
                        <span>accomodation utilities.</span>
                        <span>Also, 24/7 technical support is provided to fulfill </span>
                        <span>your needs on competition analysis.</span>
                    </Row>
                </Col>
                <Col className="col-3 justify-content-center pt-xl-5 pb-xl-5 " >
                    <Card className="rounded-0 shadow-sm">
                    
                        <Card.Body>
                            <Row className='justify-content-center p-xl-3'>
                                <Card.Title>ANALYZE BY <strong style={{color:'#4DC2BE'}}>PERIMETER</strong></Card.Title>
                            </Row>
                            <Row className='justify-content-center pt-xl-3'>
                                <Card.Title>
                                
                                <span style={{"font-size":"3em"}}class="price">
                                    <span style={{"font-size":".5em","vertical-align":"top"}}>€</span>
                                    <strong>300</strong>
                                    <span style={{"font-size":".2em","vertical-align": "super"}}>/50 Perimeter Analyses</span>
                                </span>
                                    
                                </Card.Title>
                            </Row>
                            <Row className='justify-content-center'>
                            
                            <span style={{"font-size":"0.7em"}}>Purchased analyses has an expiration date of one year. </span>
                            </Row>
                            <Row className='justify-content-center pt-xl-4'>
                                <Button onClick={()=>HandleBuy(0,50)} className="rounded-0 btn-light btn-outline-info"  variant="primary">BUY NOW</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row className='justify-content-center pt-xl-5 pb-xl-5' style={{"font-size":"0.7em"}}>
                        <span><strong>Perimeter</strong> plan provides everything you need to</span>
                        <span>find your competition in a given perimeter and</span>
                        <span>take information for the average price per search engine</span>
                        <span>or per kilometer.</span>
                        <span>Also, 24/7 technical support is provided to fulfill </span>
                        <span>your needs on competition analysis.</span>
                    </Row>
                </Col>
           
            </Row>
            
            
        </div>
    )
    }}