import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios'
import download from './download.jpg';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Steps } from 'antd';
import { useLocation } from "react-router-dom";
import { UserData } from '../../UserContext';

export default function MediaCard() {

    const location = useLocation();
    const user = UserData();

    const myParams = location.state.slide;
    const myFlight = location.state.flight;

    console.log('locationn returnnn', location.state)

    const { Step } = Steps;
    const [tripDurate, setTD] = useState();
    const [ayhaga, setayhaga] = useState();
    const [From, setFrom] = useState();
    const [To, setTo] = useState();

    const baseUrl = `http://localhost:8000/flights/FlightDetails/6186c408f38e49ec1e0d3011`;
    const baseUrl2 = `http://localhost:8000/users/61a49102b62a597189c517f0`

    const [updateReservedFlights, setUR] = useState([]);


    const history = useHistory();

    useEffect(() => {
        axios.get(baseUrl).then((response) => {

            setFrom(response.data.From);
            setTo(response.data.To);

            function toDate(dStr, format) {
                var now = new Date(myParams.FlightDepDate);
                if (format === "h:m") {
                    now.setHours(dStr.substr(0, dStr.indexOf(":")));
                    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                    now.setSeconds(0);
                    return now;
                } else
                    return "Invalid Format";
            }

            function toDate2(dStr, format) {
                var now = new Date(myParams.FlightArrDate);
                if (format === "h:m") {
                    now.setHours(dStr.substr(0, dStr.indexOf(":")));
                    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                    now.setSeconds(0);
                    return now;
                } else
                    return "Invalid Format";
            }

            function getDifferenceInHours(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / (1000 * 60 * 60);
            }
            setayhaga(response.data);
            setTD(Math.floor(getDifferenceInHours(toDate(myParams.FlightDepTime, "h:m"), toDate2(myParams.FlightArrTime, "h:m"))))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (hello) => {
        if(location.state && location.state.statusPath){
            console.log("Ret DETAILS EDIITTT")
            let path = `/editseats`;
            history.push(path, {...location.state});
        }
        else{
            setUR(updateReservedFlights.push(ayhaga));
            if (Object.keys(user).length === 0){
                let path = `/detsBeforeLogin`;
                history.push(path,{hello, myFlight});
            }
            else{
                let path = `/seats`;
                history.push(path,{ departureFlight: {...myFlight}, returnFlight: {...hello}});
            }
            console.log(hello, "Hello");
            console.log(myFlight, "Flightt");
            axios.put(baseUrl2, { updateReservedFlights }).then((response) => { console.log('updateddd', updateReservedFlights); })
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <div className="mt-5">
                        <div className="mt-5 ml-5">
                            <Steps direction="horizontal" current={1}>
                                <Step className="ml-2 mr-2" title="Finished" description="Choose Suitable Flight" />
                                <Step className="ml-2 mr-2" title="In Progress" description="Confirm Flight Reservation" />
                                <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                            </Steps>
                            <div className="d-flex align-items-center justify-content-center mt-5">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        src={download}
                                        alt="Flight Picture"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <div className="d-flex flex-column align-items-center">
                                                Flight Number : {myParams.FlightNumber}
                                            </div>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        <div>Departure Date : {myParams.FlightDepDate}</div>
                                            <div>Arrival Date : {myParams.FlightArrDate}</div>
                                            <div>Departure Time : {myParams.FlightDepTime}</div>
                                            <div>Arrival Time : {myParams.FlightArrTime}</div>
                                            <div>Trip Duartion in Hours: {tripDurate}</div>
                                            <div>First Seats : {myParams.FirstSeats.availableSeatsNum}</div>
                                            <div>Business Seats : {myParams.BusinessSeats.availableSeatsNum}</div>
                                            <div>Economy Seats : {myParams.EconomySeats.availableSeatsNum}</div>
                                            <div>Baggage Allowance : {myParams.BaggageAllowance}</div>
                                            <div>Price : {myParams.Price}</div>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button variant="warning"
                                        
                                        onClick={() => {
                                            if(location.state.statusPath){
                                                history.push('/EditReturFlightDetails', {...location.state})
                                            }
                                            else{
                                                history.push('/ViewReturnFlight', {hello: {...myFlight}})
                                            }
                                        }}>
                                        Back To Res List
                                        </Button>
                                        <Button type="primary"
                                            onClick={() => { handleSubmit(myParams) }}>
                                            Confirm Reservation</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}