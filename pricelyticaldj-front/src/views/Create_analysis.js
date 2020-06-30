import React, {useState} from 'react'
import { Container,Form, Col,Button, Headers } from 'react-bootstrap'


export default function Create(){
    const [hotelForm, setHotelForm] = useState(true)

    return(
        <div className="">
        <div className='row justify-content-md-center p-xl-4 '>
            <h1>Start an Analysis</h1>
        </div>
        <Container className='rounded-top shadow rounded-lg'>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item pt-xl-3">
                    <a className={hotelForm ? ('btn nav-link active ') : ('btn nav-link inactive')} onClick={()=>setHotelForm(true)} >Hotel Based</a>
                </li>
                <li class="nav-item pt-xl-3">
                    <a className={!hotelForm ? ('btn nav-link active ') : ('btn nav-link inactive')} onClick={()=>setHotelForm(false)} >Perimeter Based</a>
                </li>
            </ul>
            <div className='p-xl-5 '>
                {hotelForm ?(
                    <Form >
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    </Form.Row>
                
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                
                    <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>
                
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                        </Form.Control>
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    </Form.Row>
                
                    <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
                )
                
                :(
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                )
                }
            </div>
        </Container>
        </div>
    )
}