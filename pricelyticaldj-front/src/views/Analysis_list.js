import React, {useState,useEffect} from 'react'
import {SERVER_ADDRESS} from "../constants/config"
import { Card, Button, Container,CardDeck, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {FaHotel,FaBroadcastTower} from 'react-icons/fa'
import { IconContext } from "react-icons";

export default function Analysis_list(){
    const [list, setList] = useState([])
    useEffect(() => {
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`
            }    
        }
        
        axios.get(SERVER_ADDRESS + 'api/analysis/list/',options)
            .then(response => {
                setList(response.data)
                
            })
            .catch((error) =>{
              console.log("Have an error");
            }).then(()=>console.log('Final', list));
        
    },[])

    

    return (
        <div >
        <div className='row justify-content-md-center p-xl-5'>
            <h1>Analysis Repository</h1>
        </div>
        <Container >
        
        <CardDeck>
           
            <div className='row justify-content-md-center'>
            {list.map((item)=><div className='p-xl-4'> 
                                
                                <Card className="text-center shadow text-white bg-dark" style={{ width: '28rem' }}>
                                    <Card.Header>   
                                        {item.hotelBased===true     
                                        ? (
                                            <IconContext.Provider value={{ size:'2em' ,color: "#B5C8D6", className: "global-class-name" }}>
                                            <div title='Hotel Based Analysis'><FaHotel/> </div>
                                            </IconContext.Provider>  
                                        ) 
                                        : (
                                            <IconContext.Provider value={{ size:'2em' ,color: "#FC7F47", className: "global-class-name" }}>
                                            <div title='Perimeter Based Analysis'><FaBroadcastTower/> </div>
                                            </IconContext.Provider>
                                        ) }
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text >
                                            An analysis between {item.checkin_date} and {item.checkout_date} for {item.rooms} rooms, {item.adults} adults, {item.children} child(-ren).
                                        </Card.Text>
                                        <a href={'/analysis/'+item.id} className="btn btn-dark btn-outline-light btn-sm btn-block">
                                            View Analysis
                                        </a>
                                    </Card.Body>
                                        <Card.Footer className="text-muted">
                                            Created on {item.date_created.slice(0,10)}
                                        </Card.Footer>
                                </Card>
                                
                          </div>
            )}
            </div>
        
            
            </CardDeck>
        </Container>
        </div>
    )
}