import React, {useState,useEffect} from 'react'
import {SERVER_ADDRESS} from "../constants/config"
import { Card, Button, Container,CardDeck} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'

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
        <Container>
        <div className="d-flex">
            <CardDeck>
            {list.map((item)=><div className='p-xl-4 col-sm-12 col-md-4'> 
                                
                                <Card className="text-center shadow ">
                                <Card.Header><h5>{item.hotelBased===true ? ('Hotel Based Search') : ('Perimeter Based Search') }</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text >
                                        An analysis between {item.checkin_date} and {item.checkout_date} for {item.rooms} rooms, {item.adults} adults, {item.children} child(-ren).
                                    </Card.Text>
                                    <Link to={'/api/analysis/'+item.id}>
                                    <Button variant="primary">View Analysis</Button>
                                    </Link>
                                </Card.Body>
                                    <Card.Footer className="text-muted">
                                        Created on {item.date_created.slice(0,10)}
                                    </Card.Footer>
                                </Card>
                                
                          </div>
            )}
            </CardDeck>
        </div>
        </Container>
    )
}