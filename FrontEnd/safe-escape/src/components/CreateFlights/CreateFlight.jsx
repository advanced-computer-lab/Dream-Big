import axios from "axios";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Form from "react-bootstrap"
 const  CreateFlight= () =>
{
    const [flight,setFlight] = React.useState({});
    const [value, onChange] = useState(new Date());
    const [value2, onChange2] = useState(new Date());
    
    // const flightNumber = useId();
    // flight.ID=flightID;
    // const [submitted,setSubmitted]=React.useState(false);;
    // const [name,setName] = React.useState("");
    const baseURL = 'http://localhost:8000/flights';
    
    // React.useEffect(() => {
       
    // },submitted);const [validated, setValidated] = useState(false);
    const [validated, setValidated] = useState(false);

    // const handleSubmit2 = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };
      
    // const handleSubmit = (evt) => {
    //     // setSubmitted(true);
        
    //     evt.preventDefault();
    //     const form = event.currentTarget;

    //     if (form.checkValidity() === false) {
    //         evt.preventDefault();
    //         evt.stopPropagation();
    //     }

    //     setValidated(true);
    //     alert('Creating Flight');
    //     axios.post(`${baseURL}/createFlight`,flight  
    //     )
    //     .then((response) => {
    //         setFlight(response.data);
    //         console.log("Flight",flight);
    //         })
    //     .catch(err => console.log(err))

       
    // } 
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        // event.preventDefault();

        setValidated(true);
        axios.post(`${baseURL}/createFlight`,flight  )
            .then(() => {
               
                console.log("Flight",flight);
               
                })
            .catch(err => console.log(err))
            alert("Flight is Created");
      };
    
            return (
                <Card className ="m-auto w-50 mt-3">
                    <Card.Header className = 'text-center'>
                        <Card.Title >Create Flight</Card.Title>
                    </Card.Header>
                     <Card.Body>
                         <Col>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                         <Row>
                                
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Flight Number</Form.Label>
                                    <Form.Control placeholder="Enter A Flight Number"
                                     type="text" className="form-control"
                                      id="validationCustomUsername"
                                       aria-describedby="inputGroupPrepend"
                                        required
                                        onChange = {e => {setFlight(Object.assign(flight,{["FlightNumber"]:e.target.value}))}}
                                        
                                    />  
                                </Form.Group>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom02">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control placeholder="From Where" required
                                        id="validationCustomUsername"
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["From"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom03">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control placeholder="Destination"
                                        required
                                        id="validationCustomUsername"
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["To"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom04">
                                    <Form.Label>Airport</Form.Label>
                                    <Form.Control placeholder="Enter An Airport"
                                                  required
                                                  id="validationCustomUsername"
                                                  type="text"
                                                  aria-describedby="inputGroupPrepend"
                                                  className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["Airport"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom05">
                                    <Form.Label>Terminal</Form.Label>
                                    <Form.Control placeholder="Enter A Terminal"
                                     type="number"
                                     required
                                     id="validationCustomUsername"
                                     
                                     aria-describedby="inputGroupPrepend"
                                     className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["Terminal"]:e.target.value}))}}
                                    />
                                    {/* <Form.Select defaultValue="Terminal" 
                                    onChange = {e => {setFlight(Object.assign(flight,{["Terminal"]:e.target.value}))}}>
                                        <option value = "">Select A Terminal</option>
                                        <option value = {1}>1</option>
                                        <option value = {2}>2</option>
                                        <option value = {3}>3</option>
                                    </Form.Select> */}
                                </Form.Group>
                            </Row>
                           
                            <Row>
                                <Form.Group controlId="validationCustom06">
                                    <Form.Label>Departure Date</Form.Label>
                                    <Form.Control placeholder="Select Departure Date" 
                                        input = "date"
                                        type = "date"
                                        required
                                        id="validationCustomUsername"
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["FlightDepDate"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom07">
                                    <Form.Label>Departure Time</Form.Label>
                                    <Form.Control placeholder="Select Departure Time" 
                                        input = "time"
                                        type = "time"
                                        required
                                        id="validationCustomUsername"
                                     
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["FlightDepTime"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom08">
                                    <Form.Label>Arrival Date</Form.Label>
                                    <Form.Control placeholder="Select Arrival Date" 
                                        input = "date"
                                        type = "date"
                                        required
                                        id="validationCustomUsername"
                                        
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["FlightArrDate"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom09">
                                    <Form.Label>Arrival Time</Form.Label>
                                    <Form.Control placeholder="Select Arrival Time" 
                                        input = "time"
                                        type = "time"
                                        required
                                        id="validationCustomUsername"
                                        
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["FlightArrTime"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom10">
                                    <Form.Label> Number of First Class Seats:</Form.Label>
                                    <Form.Control placeholder="Enter  Number of First Class Seats:" 
                                        input = "number"
                                        type = "number"
                                        
                                        id="validationCustomUsername"
                                       
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["FirstSeats"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom11">
                                    <Form.Label>Number of Business Seats:</Form.Label>
                                    <Form.Control placeholder="Enter Number of Business Seats" 
                                        input = "number"
                                        type = "number"
                                        
                                        id="validationCustomUsername"
                                       
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["BusinessSeats"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="validationCustom12">
                                    <Form.Label> Number of Economy Seats:</Form.Label>
                                    <Form.Control placeholder="Enter Number of Economy Seats" 
                                        input = "number"
                                        type = "number"
                                        
                                        id="validationCustomUsername"
                                        
                                        aria-describedby="inputGroupPrepend"
                                        className="form-control"
                                        onChange = {e => {setFlight(Object.assign(flight,{["EconomySeats"]:e.target.value}))}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className ="mt-1">
                                <Form.Group className ="d-flex flex-column" controlId="validationCustom01">
                                    <Button variant="success"
                                     id="button-1" 
                                     type="submit"
                                        disabled = {''} >
                                            Create
                                    </Button>
                                </Form.Group>
                            </Row>
                            </Form>
                         </Col>
                     </Card.Body>
                </Card>
            )
        }
    
        // onClick = {handleSubmit}
export default CreateFlight;