import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import download from './download.jpg';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { Modal } from 'antd';
import Button from 'react-bootstrap/Button';
import { UserData } from '../../UserContext'

const SeeDets2 = () => {

    const history = useHistory();
    const location = useLocation();

    const hello = location.state.hello;
    const myFlight = location.state.myFlight;

    console.log('locc', location.state)

    const user = UserData();

    const baseUrl = `http://localhost:8000/users/users/${user._id}`;

    const routeChange = () => {
        let path = `/login`;
        history.push(path, { hello, myFlight })
    }

    const routeChange2 = () => {
        let path = `/ViewOutBoundFlight`;
        history.push(path);
    }

    const routeChange3 = () => {
        let path = `/ViewReturnFlight`;
        history.push(path, {hello: {...myFlight}});
    }

    const [flight_1, setFlight_1] = useState(location.state.myFlight);
    const [flight_2, setFlight_2] = useState(location.state.hello);

    let { id } = useParams();

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
                    <Button className="m-3" type="default" onClick={routeChange2} >Edit Flight</Button>
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
                    <Button className="m-3" type="default" onClick={routeChange3} >Edit Flight</Button>
                </Card>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button variant="success" onClick={routeChange}>Login To Confirm Booking</Button>
            </div>
        </div>
    );
}

export default SeeDets2;