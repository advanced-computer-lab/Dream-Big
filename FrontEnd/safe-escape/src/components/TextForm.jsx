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

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const [updatedFlights, setupdatedFlights] = useState({});
    let { id } = useParams();
    const baseURL = `http://localhost:8000/flights/${id}`;

    function handleSubmit2() {
        axios.patch(baseURL, { updatedFlights }).then((response) => { console.log(updatedFlights); })
        alert("Flight Updated Successfully");
    }
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
                            required
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
                            required
                            type="text"
                            placeholder="From Country"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>To: </Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["To"]: event.target.value }))}
                            required
                            type="text"
                            placeholder="To Destination"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Flight Departure Date</Form.Label>
                        <Form.Control
                            input="date"
                            type="date"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightDepDate"]: event.target.value }))}
                            placeholder="Flight Date"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Flight Arrival Date</Form.Label>
                        <Form.Control
                            input="date"
                            type="date"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightArrDate"]: event.target.value }))}
                            placeholder="Flight Date"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Flight Arrival Time</Form.Label>
                        <Form.Control
                            input="time"
                            type="time"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightArrTime"]: event.target.value }))}
                            placeholder="Flight Date"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group><Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Flight Departure Time</Form.Label>
                        <Form.Control
                            input="time"
                            type="time"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["FlightDepTime"]: event.target.value }))}
                            placeholder="Flight Date"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-5 mt-3" >
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Choose Seat Number</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={event => setupdatedFlights(Object.assign(updatedFlights, { ["Seats Available on Flight"]: event.target.value }))}
                            placeholder="Seat Number"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Are You Sure You Want to Update this Flight"
                        feedback="You must agree before Updating."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit2}>Update Flight</Button>
            </Form></div>
    );
};
export default Userform;