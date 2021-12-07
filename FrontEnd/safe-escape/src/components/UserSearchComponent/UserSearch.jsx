import axios from "axios";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './UserSearch.css'
import { color } from "@mui/system";
import { useHistory } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const UserSearch = (props) => {

  const history = useHistory();

  const routeChange = () => {
    let path = `/ViewOutBoundFlight`;
    history.push(path);
  }

  const baseURL = 'http://localhost:8000/users/getUserSearch';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [classType, setClassType] = React.useState('');
  const [searchedDepFlights, setSearchedDepFlights] = useState({});
  const [searchedRetFlights, setSearchedRetFlights] = useState({});

  const [open, setOpen] = React.useState(false);
  const [adultsNumber, setAdultsNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const [TravellerDetailsValue, setTravellerDetailsValue] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //USER'S INPUT
  const [userSearchDeptInput, setUserSearchDeptInput] = useState({});
  const [userSearchRetInput, setUserRetSearchInput] = useState({});
  const [NumberOfPassengers, setNumberOfPassengers] = useState(0);
  //OUTPUT
  const [departureFlightsOutput, setDepartureFlightsOutput] = useState([]);
  const [returnFlightsOutput, setReturnFlightsOutput] = useState([]);
  //show div in search
  const [showDiv, setShowDiv] = useState(false);
  //noMatchingFlights
  const [noMatchingFlights, setNoMatchingFlights] = useState(false);
  //isEmpty
  const [isEmpty, setIsEmpty] = useState(true);
  //
  const [cabin, setCabin] = useState('EconomySeats');
  //
  const [depLengthZero, setDepLengthZero] = useState(false);
  //
  const [retLengthZero, setRetLengthZero] = useState(false);

  const handleClassChange = (event) => {
    setClassType(event.target.value);
  };
  const handleSubmit = () => {

    axios.post(baseURL, userSearchDeptInput).then(res => {
      setDepartureFlightsOutput(res.data);
      console.log(res.data);
      props.setDepFlights(res.data);
      if (res.data.length === 0)
        setDepLengthZero(true);
    });
    axios.post(baseURL, userSearchRetInput).then(res => {
      setReturnFlightsOutput(res.data);
      console.log(res.data);
      props.setRetFlights(res.data);
      if (res.data.length === 0)
        setRetLengthZero(true);

    });

    routeChange();

    props.setSearchCriteria({ depCriteria: userSearchDeptInput, retCriteria: userSearchRetInput });

    if (depLengthZero && retLengthZero)
      setNoMatchingFlights(true);

  }

  return (

    <div style={{ alignItems: 'center' }}>
      <div style={{height: '100vh', width: '100%' }} className="d-flex flex-column justify-content-center align-items-center" >
        <Card className="text-center m-auto w-75 mt-auto" style={{ backgroundColor: "white", opacity: '0.85' }}>
          {/* <Card.Header>Flights</Card.Header> */}
          <Card.Body>
            <Card.Title>Book Your Flight</Card.Title>

            <Form noValidate className="d-flex justify-content-center align-items-center mb-3">
              <Row>
                <Col>
                  <Form.Group controlId="validationCustom01">
                    <TextField id="standard-basic" label="From" variant="standard" onChange={e => { setUserSearchDeptInput({ ...userSearchDeptInput, "From": e.target.value }); setUserRetSearchInput({ ...userSearchRetInput, "To": e.target.value }); setIsEmpty(false); }} />

                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                {/* <i class="fas fa-exchange-alt"></i> */}
                <Col>
                  <Form.Group controlId="validationCustom01">

                    <TextField id="standard-basic" label="To" variant="standard" onChange={e => { setUserSearchDeptInput({ ...userSearchDeptInput, "To": e.target.value }); setUserRetSearchInput({ ...userSearchRetInput, "From": e.target.value }); setShowDiv(true); setIsEmpty(false); }} />
                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom01">

                    {/* <TextField id="standard-basic" label="Departure Date" variant="standard" type="date"/> */}
                    <div style={{ display: 'flex', flexDirection: "column", flexWrap: "wrap" }} className="d-flex justify-content-center align-items-center">
                      <label>Departure Date</label>

                      <input type="date" label="Departure Date" style={{ borderBlock: "unset", borderBlockEnd: "revert", borderLeft: "tan", borderRight: "tan" }} onChange={e => { setUserSearchDeptInput({ ...userSearchDeptInput, "FlightDepDate": e.target.value }); setIsEmpty(false); }} />


                    </div>

                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom01">

                    {/* <TextField id="standard-basic" label="Return Date" variant="standard"/> */}
                    <div style={{ display: 'flex', flexDirection: "column", flexWrap: "wrap" }} className="d-flex justify-content-center align-items-center">
                      <label>Return Date</label>

                      <input type="date" label="Return Date" style={{ borderBlock: "unset", borderBlockEnd: "revert", borderLeft: "tan", borderRight: "tan" }} onChange={e => { setUserRetSearchInput({ ...userSearchRetInput, "FlightDepDate": e.target.value }); setIsEmpty(false); }} />


                    </div>
                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>


                <Col>
                  <Form.Group controlId="validationCustom01">
                    <NativeSelect
                      defaultValue={'Select A Class Type'}
                      className="mt-3"
                      //onChange = {e => {setUserSearchDeptInput({...userSearchDeptInput,"Cabin":e.target.value});setUserRetSearchInput({...userSearchRetInput,"Cabin":e.target.value})}}
                      onChange={e => { if (!(e.target.value == '')) { setCabin(e.target.value); } }}
                    >
                      <option value={''}>Select A Cabin</option>
                      <option value={'EconomySeats'}>Economy</option>
                      <option value={'FirstSeats'}>First-Class</option>
                      <option value={'BusinessSeats'}>Business</option>
                    </NativeSelect>
                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom01">
                    <TextField id="standard-basic" label="Traveller" variant="standard" value={TravellerDetailsValue} onClick={handleOpen} />
                  </Form.Group>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
            {showDiv ?
              <div className="d-flex justify-content-center  align-items-center w-100">
                <div className="d-flex justify-content-center justify-content-between align-items-center w-25">
                  <div>
                    From {userSearchDeptInput.From}
                  </div>
                  <div>
                    <i className="gg-airplane plane"></i>
                  </div>
                  <div>
                    To {userSearchDeptInput.To}
                  </div>
                </div>
              </div> : ''}

            {noMatchingFlights ?
              <div className="d-flex justify-content-center  align-items-center w-100">
                <div className="d-flex justify-content-center justify-content-between align-items-center w-0">
                  <div style={{ color: 'red', textAlign: 'center' }}>
                    NO MATCHING FLIGHTS
                  </div>

                </div>
              </div> : ''}

            <Button className="btn-warning" variant="success" onClick={handleSubmit} disabled={isEmpty}>Search</Button>
          </Card.Body>

        </Card>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1>Travellers Details</h1>
            <form className="d-flex justify-content-center align-items-center" style={{ flexDirection: "column", flexWrap: "wrap" }}>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div>
                  <label className="m-2">Adults</label>
                  <input type="number" onChange={(e) => { if (e.target.value < 0) { e.target.value = 0; } else { setAdultsNumber(e.target.value); } }} />
                </div>
                <div>
                  <label>Children</label>
                  <input type="number" onChange={(e) => { if (e.target.value < 0) { e.target.value = 0; } else { setChildrenNumber(e.target.value); } }} />
                </div>
                <button className="btn-warning" onClick={() => {
                  if (childrenNumber > 0 && adultsNumber > 0) {
                    setTravellerDetailsValue(` Adults ${adultsNumber}` + ` ,Children ${childrenNumber}`);
                  }
                  else {

                    if (childrenNumber > 0) {
                      setTravellerDetailsValue(TravellerDetailsValue + ` Children ${childrenNumber}`);
                      console.log(TravellerDetailsValue);

                      //   const x =`Children ${childrenNumber}`;
                      // Object.assign(TravellerDetailsValue, {x});
                    }
                    if (adultsNumber > 0) {
                      //`${TravellerDetailsValue}`+` Adults ${adultsNumber}`)
                      setTravellerDetailsValue(TravellerDetailsValue + ` Adults ${adultsNumber}`);
                      console.log(TravellerDetailsValue);
                      // Object.assign(`${TravellerDetailsValue}`,` Adults ${adultsNumber}`);

                    }
                    // setTravellerDetailsValue(y);
                  }
                  setNumberOfPassengers(adultsNumber + childrenNumber);
                  //  setUserSearchDeptInput({...userSearchDeptInput,[cabin]:{"availableSeatsNum": {"$gte":parseInt(adultsNumber)+parseInt(childrenNumber)}}});
                  setUserSearchDeptInput({ ...userSearchDeptInput, cabin: cabin, chosenSeats: (parseInt(adultsNumber) + parseInt(childrenNumber)), [`${cabin}.availableSeatsNum`]: { $gte: parseInt(adultsNumber) + parseInt(childrenNumber) } });
                  setUserRetSearchInput({ ...userSearchRetInput, cabin: cabin, chosenSeats: (parseInt(adultsNumber) + parseInt(childrenNumber)), [`${cabin}.availableSeatsNum`]: { $gte: parseInt(adultsNumber) + parseInt(childrenNumber) } });
                  setOpen(false);
                  // { [req.body.Cabin] :{availableSeatsNum:{$gte : req.body.numberOfPassengers}}, ...req.body}

                }}>Continue</button>
              </div>
            </form>


          </Box>
        </Modal>

        {/* <Modal
                      open={openDeptDate}
                      onClose={handleCloseDeptDate}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box>
                        <input type="date" />
                      </Box>
                    </Modal> */}
      </div>
    </div>
  );
}

export default UserSearch;