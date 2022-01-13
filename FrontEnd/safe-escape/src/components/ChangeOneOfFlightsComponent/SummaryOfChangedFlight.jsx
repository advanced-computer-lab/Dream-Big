import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import download from '../ConfirmReservationComponent/download.jpg';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom"
import {  Button } from 'antd';
import { UserData } from '../../UserContext';

const ChangeComparisonSummary = props => {

    const history = useHistory();
    const location = useLocation();

    console.log(location.state, "state");

    const oldFlight =  location.state.flightNotToChange;
    const newFlight =  location.state.slide;
    const user = UserData();

    const cabins = location.state.cabin;
    const depSeats = location.state.dSeats;

    const depPassInfo = location.state.depPassInfo

    console.log(oldFlight, 'oldFlight')
    console.log(newFlight, 'newFlight')
    console.log(user, 'userrr')

    console.log('dseats', depSeats)
    console.log('cabinsss', cabins)
    console.log('dpass', depPassInfo)

    const baseUrl = `http://localhost:8000/users/updatereservedtrip`;

    const routeChange = () => {
        axios.patch(baseUrl,{
            ...location.state,
            userId: user._id
        }).then((response) => {
            let path = `/RoundTripReserved`;
            //I Need to send to kamal new flight and reserved flight not changed
            props.setUser(response.data);
            history.push(path,{dflight: location.state.flightNotToChange, rflight: location.state.slide})
        })
    }

    const [flight_1, setFlight_1] = useState(location.state.flightNotToChange);
    const [flight_2, setFlight_2] = useState(location.state.slide);


    return (
        <div>
            <div className="d-flex justify-content-center">
                <Card sx={{ maxWidth: 345 }} className="m-2 text-center">
                    <CardMedia
                        component="img"
                        height="140"
                        src={download}
                        alt="Flight Picture"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                            <div className="d-flex flex-column align-items-center">
                                Old Flight
                            </div>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            <div className="d-flex flex-column align-items-center">
                                Flight Number : {flight_1.FlightNumber}
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <div>Departure Date : {flight_1.FlightDepDate}</div>
                            <div>Arrival Date : {flight_1.FlightArrDate}</div>
                            <div>Departure Time : {flight_1.FlightDepTime}</div>
                            <div>Arrival Time : {flight_1.FlightArrTime}</div>
                            <div>First Seats : {flight_1.FirstSeats.availableSeatsNum}</div>
                            <div>Business Seats : {flight_1.BusinessSeats.availableSeatsNum}</div>
                            <div>Economy Seats : {flight_1.EconomySeats.availableSeatsNum}</div>
                            <div>Baggage Allowance : {flight_1.BaggageAllowance}</div>
                            <div>Price : {flight_1.Price}</div>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }} className="m-2 text-center" >
                    <CardMedia
                        component="img"
                        height="140"
                        src={download}
                        alt="Flight Picture"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <div className="d-flex flex-column align-items-center">
                                New Flight
                            </div>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            <div className="d-flex flex-column align-items-center">
                                Flight Number : {flight_2.FlightNumber}
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <div>Departure Date : {flight_2.FlightDepDate}</div>
                            <div>Arrival Date : {flight_2.FlightArrDate}</div>
                            <div>Departure Time : {flight_2.FlightDepTime}</div>
                            <div>Arrival Time : {flight_2.FlightArrTime}</div>
                            <div>First Seats : {flight_2.FirstSeats.availableSeatsNum}</div>
                            <div>Business Seats : {flight_2.BusinessSeats.availableSeatsNum}</div>
                            <div>Economy Seats : {flight_2.EconomySeats.availableSeatsNum}</div>
                            <div>Baggage Allowance : {flight_2.BaggageAllowance}</div>
                            <div>Price : {flight_2.Price}</div>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button type="primary" onClick={routeChange}>Confirm Booking</Button>
            </div>
        </div>
    );
}

export default ChangeComparisonSummary;