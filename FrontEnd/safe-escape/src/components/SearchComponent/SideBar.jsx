import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import DatePicker from 'react-date-picker';
//import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';

import { useState } from 'react'

const SideBar = props => {

    const [ fromDate, setFromDate ] = useState();
    const [ toDate, setToDate ] = useState();
    const [ fromTime, setFromTime ] = useState();
    const [ toTime, setToTime ] = useState();

    console.log('side')

    return (
        <>
        <Row>
            <Form.Group>
                <Form.Label>Enter Flight Number</Form.Label>
                <Form.Control placeholder="Flight Number" 
                    onChange = {(e) => props.handleChange("Flight Number", e.target.value)}
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
                <Form.Label>Enter Terminal</Form.Label>
                <Form.Select defaultValue="Terminal" 
                onChange = {(e) => props.handleChange("Terminal", e.target.value)}>
                    <option value = "">Terminal</option>
                    <option value = {1}>1</option>
                    <option value = {2}>2</option>
                    <option value = {3}>3</option>
                </Form.Select>
            </Form.Group>
        </Row>
        {/* <Row>
            <Form.Group>
                <Form.Label>Enter To Date</Form.Label>
                <DateTimePicker
                    onChange={(day) => {
                        props.handleChange("Date", day)
                        setDate(day)
                    }}
                    value = {date}
                />
            </Form.Group>
        </Row> */}
        <Row>
            <Form.Group className ="d-flex flex-column">
                <Form.Label>Enter From Date</Form.Label>
                <DatePicker
                    onChange={(day) => {
                        props.handleChange("Flight Date", day)
                        setFromDate(day)
                    }}
                    value = {fromDate}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group className ="d-flex flex-column">
                <Form.Label>Enter From Time</Form.Label>
                <TimePicker
                    onChange={(time) => {
                        props.handleChange("From Flight Time", time)
                        setFromTime(time)
                    }}
                    value = {fromTime}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group className ="d-flex flex-column">
                <Form.Label>Enter To Date</Form.Label>
                <DatePicker
                    onChange={(day) => {
                        props.handleChange("To Flight Date", day)
                        setToDate(day)
                    }}
                    value = {toDate}
                />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group className ="d-flex flex-column">
                <Form.Label>Enter To Time</Form.Label>
                <TimePicker
                    onChange={(time) => {
                        props.handleChange("To Flight Time", time)
                        setToTime(time)
                    }}
                    value = {toTime}
                />
            </Form.Group>
        </Row>
        <Row className ="mt-2 ">
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