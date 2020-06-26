import React from 'react';
import {Form ,Button,Container,Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = (props) => {
    return(
        
        <Container fluid className="pt-xl-5 mx-auto" >
            <Row > 
            <Col md={{ span: 4, offset: 2 }} className="justify-content-md-center shadow p-xl-5 mx-auto">
            <Row><h2 className="text-center">Please Log In</h2></Row>
            <Form onSubmit={props.Submited}>
            
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
                <Form.Text className="text-muted">
                We'll never share your username with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
                Log In
            </Button>
            </Form>
            </Col>
            </Row>
        </Container>
    );
}

export default UserForm;