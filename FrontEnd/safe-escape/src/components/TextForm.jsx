import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Component, useState, useEffect } from 'react';
import { Alert } from 'react-alert';

const Userform = () => {

    const state = {
        checkbox: "",
        checkboxValid: false,
        errorMsg: {},
        selectedCheckBox: 0
    };

    const [validated, setValidated] = useState(false);

    const [checkBox, setCheckBox] = useState(false);

    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        console.log('form', form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            setValidated(true);
            axios.patch(baseURL, { updatedFlights }).then((response) => { console.log('updateddd',updatedFlights); })
        }
    };

    const [updatedFlights, setupdatedFlights] = useState({});
    let { id } = useParams();
    const baseURL = `http://localhost:8000/flights/${id}`;

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Flight Number</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightNumber"]: event.target.value }))}
                            
                            type="text"
                            placeholder="Flight Number"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>From: </Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["From"]: event.target.value }))}
                            
                            type="text"
                            placeholder="From Country"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>To: </Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["To"]: event.target.value }))}
                            
                            type="text"
                            placeholder="To Destination"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Flight Departure Date</Form.Label>
                        <Form.Control
                            input="date"
                            type="date"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightDepDate"]: event.target.value }))}
                            placeholder="Flight Date"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Flight Arrival Date</Form.Label>
                        <Form.Control
                            input="date"
                            type="date"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightArrDate"]: event.target.value }))}
                            placeholder="Flight Date"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Flight Arrival Time</Form.Label>
                        <Form.Control
                            input="time"
                            type="time"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightArrTime"]: event.target.value }))}
                            placeholder="Flight Date"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group><Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Flight Departure Time</Form.Label>
                        <Form.Control
                            input="time"
                            type="time"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightDepTime"]: event.target.value }))}
                            placeholder="Flight Date"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-5 mt-3" >
                    <Form.Group as={Col} md="4" controlId="validationCustom08">
                        <Form.Label>First Class Number of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FirstSeats"]: event.target.value }))}
                            placeholder="Seat Number"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom09">
                        <Form.Label>Business Class Number of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["BusinessSeats"]: event.target.value }))}
                            placeholder="Seat Number"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom10">
                        <Form.Label>Economy Class Number of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["EconomySeats"]: event.target.value }))}
                            placeholder="Seat Number"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" >
                    <Form.Check
                        required
                        label="Are You Sure You Want to Update this Flight"
                        feedback="You must agree before Updating."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" >Update Flight</Button>
            </Form></div>
    );
};
export default Userform;