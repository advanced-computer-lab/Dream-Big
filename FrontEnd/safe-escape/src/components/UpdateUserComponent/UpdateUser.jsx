import axios from "axios";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    useParams
} from "react-router-dom";
import Card from 'react-bootstrap/Card';

const UpdateUser = () => {
    const [toBeUpdatedInUser, setToBeUpdatedInUser] = useState({});
    let { id } = useParams();
    const baseURL = `http://localhost:8000/users/${id}`;

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        console.log('form', form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            setValidated(true);
            axios.put(baseURL, { toBeUpdatedInUser })
            .then((response) => 
            { 
                console.log('updateddd',toBeUpdatedInUser);
            }
            );
        }
    };

   
    return (
        // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        <div style={{alignItems:'center'}}>
        <div style={{ backgroundImage: "url(/airplane-sky-flight-clouds.jpg)",backgroundSize:'100%',height:'100vh',zIndex:'0'}} className="d-flex flex-column justify-content-center align-items-center" >
            
            <Card sx={{ maxWidth: 345 }} className="mt-5 text-center m-auto w-50 mt-auto" style={{backgroundColor:"white", opacity:'0.85'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="justify-content-center p-5">
                <h1>Update User Details</h1>
                <Row className="mb-3 ml-2">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "FirstName": event.target.value }))}          
                            type="text"
                            placeholder="FirstName"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                 
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "LastName": event.target.value }))}
                            
                            type="text"
                            placeholder="LastName"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            input="text"
                            type="text"
                            onChange={event => setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "Email": event.target.value }))}
                            placeholder="Email"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                 
                </Row>
                <Row className="mb-5 mt-3" >
                    <Form.Group as={Col} md="4" controlId="validationCustom08">
                        <Form.Label>PassportNumber</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={event => setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "PassportNumber": event.target.value }))}
                            placeholder="Seat Number"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                   
                </Row>
                <Form.Group className="mb-3 d-flex justify-content-center" >
                    <Form.Check
                        required
                        //label="Are You Sure You Want to Update this Flight"
                        feedback="You must agree before Updating."
                        feedbackType="invalid"
                    />
                    <Form.Label>
                    Are You Sure You Want to Update this Flight 
                    </Form.Label>
                </Form.Group>
                <Button variant="warning" type="submit" >Update User</Button>
            </Form>
            </Card>
            </div>
            </div>
            
  
    );
};

export default UpdateUser;