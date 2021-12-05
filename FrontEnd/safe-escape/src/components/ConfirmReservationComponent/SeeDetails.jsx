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
import { Modal, Button } from 'antd';

const SeeDets = () => {

    const history = useHistory();

    const routeChange = () => {
        let path = `/RoundTripReserved`;
        history.push(path);
    }

    const [flight_1, setFlight_1] = useState({});
    const [flight_2, setFlight_2] = useState({});

    let { id } = useParams();
    const baseUrl = `http://localhost:8000/users/UserDetails/61a4708e8c20bdc40a534333`;

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            console.log(response.data);
            setFlight_1(response.data.ReservedFlights[0]);
            console.log(response.data.ReservedFlights[0], "w7da");
            setFlight_2(response.data.ReservedFlights[1]);
        })
    }, []);

    return (
        <div>
        <div className="d-flex justify-content-center mt-2">
            <Card sx={{ maxWidth: 345 }} className = "m-2 text-center">
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
                        {/* <div>Departure Date : {flight_1.FlightDepDate}</div>
                        <div>Arrival Date : {flight_1.FlightArrDate}</div>
                        <div>Departure Time : {flight_1.FlightDepTime}</div>
                        <div>Arrival Time : {flight_1.FlightArrTime}</div>
                        <div>First Seats : {flight_1.FirstSeats.availableSeatsNum}</div>
                        <div>Business Seats : {flight_1.BusinessSeats.availableSeatsNum}</div>
                        <div>Economy Seats : {flight_1.EconomySeats.availableSeatsNum}</div>
                        <div>Baggage Allowance : {flight_1.BaggageAllowance}</div>
                        <div>Price : {flight_1.Price}</div> */}
                    </Typography>
                </CardContent>
                <Button className = "m-3" type = "default">Edit Flight</Button>
            </Card>
            <Card sx={{ maxWidth: 345 }} className = "m-2 text-center" >
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
                        {/* <div>Departure Date : {flight_2.FlightDepDate}</div>
                        <div>Arrival Date : {flight_2.FlightArrDate}</div>
                        <div>Departure Time : {flight_2.FlightDepTime}</div>
                        <div>Arrival Time : {flight_2.FlightArrTime}</div>
                        <div>First Seats : {flight_2.FirstSeats.availableSeatsNum}</div>
                        <div>Business Seats : {flight_2.BusinessSeats.availableSeatsNum}</div>
                        <div>Economy Seats : {flight_2.EconomySeats.availableSeatsNum}</div>
                        <div>Baggage Allowance : {flight_2.BaggageAllowance}</div>
                        <div>Price : {flight_2.Price}</div> */}
                    </Typography>
                </CardContent>
                <Button className = "m-3" type = "default">Edit Flight</Button>
            </Card>
        </div>
        <div className="d-flex justify-content-center mt-2">
        <Button type = "primary" onClick = {routeChange}>Confirm Booking</Button>
        </div>
        </div>
    );
}

export default SeeDets;