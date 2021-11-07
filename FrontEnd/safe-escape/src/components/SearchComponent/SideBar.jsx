import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

// import { useState } from 'react'

const SideBar = props => {
    return (
        <>
        <Row>
            <Form.Group>
                <Form.Label>Enter Flight Number</Form.Label>
                <Form.Control placeholder="Flight Number" 
                    onChange = {(e) => props.handleChange("FlightNumber", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter Location</Form.Label>
                <Form.Control placeholder="From" 
                    onChange = {(e) => props.handleChange("From", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter Location</Form.Label>
                <Form.Control placeholder="To"
                    onChange = {(e) => props.handleChange("To", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Airport</Form.Label>
                <Form.Control placeholder="Airport"
                    onChange = {(e) => props.handleChange("Airport", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Terminal</Form.Label>
                <Form.Control placeholder="Enter A Terminal"
                    type="number"
                    onChange = {(e) => props.handleChange("Terminal", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter From Date</Form.Label>
                <Form.Control placeholder="From" 
                    input = "date"
                    type = "date"
                    onChange = {(e) => props.handleChange("FlightDepDate", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter From Time</Form.Label>
                <Form.Control placeholder="From" 
                    input = "time"
                    type = "time"
                    onChange = {(e) => props.handleChange("FlightDepTime", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter To Date</Form.Label>
                <Form.Control placeholder="From" 
                    input = "date"
                    type = "date"
                    onChange = {(e) => props.handleChange("FlightArrDate", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Enter To Time</Form.Label>
                <Form.Control placeholder="From" 
                    input = "time"
                    type = "time"
                    onChange = {(e) => props.handleChange("FlightArrTime", e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row className ="mt-1">
            <Form.Group className ="d-flex flex-column">
                <Button variant="success" id="button-1" 
                    disabled = {Object.keys(props.search).length === 0} onClick = {props.handleSubmit} style={{zIndex:'0'}}>
                        Search
                </Button>
            </Form.Group>
        </Row>
        </>
    )
}

export default SideBar