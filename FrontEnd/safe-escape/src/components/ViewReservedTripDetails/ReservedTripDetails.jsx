import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import download from '../ConfirmReservationComponent/download.jpg';
import friends from './friends.jpg'
import FadeInOut from '../SelectSeatComponent/Fader'
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Button } from 'antd';
import { UserData } from '../../UserContext'
import { useRef, useEffect } from 'react'

const ReservedTripDetails = props => {
    const history = useHistory();
    const location = useLocation();
    const user = UserData();

    const trip = location.state.trip;
    const tripIndex = location.state.tripIndex;

    console.log(trip, 'Trippp')
    console.log(tripIndex, 'tripIndexx')
    console.log(user, 'userrr')

    const baseUrl = `http://localhost:8000/users/users/${user._id}`;

    useEffect(() => {
        props.changeDisplay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeRoute = (flightNotToChange, flightToChange, passengersInfo, Flighttype, tIndex, ChosenCabin, trip) => {
        let path = `/users/search`;
        history.push(path, {
            statusPath: "Changing Flight",
            flightNotToChange,
            flightToChange,
            passengersInfo,
            numOfPassengers: Object.keys(passengersInfo).length,
            Flighttype,
            tIndex,
            ChosenCabin,
            trip,
            bothFlights: [trip.Departure, trip.Return]
        })
    }

    const editRoute = (flight, passengersInfo, Flighttype, tIndex, ChosenCabin) => {
        let path = `/editSeats`;
        history.push(path, {
            flight,
            passengersInfo,
            Flighttype,
            tIndex,
            ChosenCabin
        })
    }

    return (
        <div className="d-flex justify-content-center justify-content-between" >
            <div className="d-flex justify-content-center h-100">
            <Card className = 'm-2' style = {{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                <Typography className='text-center' variant="h5" component="div">
                    Reserved Departure Flight Details
                </Typography>
                <FadeInOut show={true} duration={500} >
                <CardContent className = 'd-flex '>
                
                <Card sx={{ maxWidth: 345 }} className = "m-2 text-center d-flex flex-column justify-content-between">
                        <CardMedia
                            component="img"
                            height="140"
                            src={download}
                            alt="Flight Picture"
                        />
                        <CardContent className = 'd-flex flex-column justify-content-center '>
                            <Card>
                                <Typography gutterBottom variant="h5" component="div">
                                    <div className="d-flex flex-column align-items-center">
                                        Flight Number : {trip.Departure.FlightNumber}
                                    </div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div>Departure Date : {trip.Departure.FlightDepDate}</div>
                                    <div>Arrival Date : {trip.Departure.FlightArrDate}</div>
                                    <div>Departure Time : {trip.Departure.FlightDepTime}</div>
                                    <div>Arrival Time : {trip.Departure.FlightArrTime}</div>
                                    <div>Chosen Cabin : {trip.ChosenCabin}</div>
                                    <div>Baggage Allowance : {trip.Departure.BaggageAllowance}</div>
                                    <div>Price : {trip.Departure.Price}</div>
                                </Typography>
                            </Card>
                        </CardContent>
                        <Button className = "m-3" type = "default" onClick = {() => changeRoute(trip.Return, trip.Departure, trip.depPassengerInfo, 'Departure', tripIndex, 
                        trip.ChosenCabin, trip)} >Change Flight</Button>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} className = "m-2 d-flex flex-column justify-content-between">
                            <CardMedia
                                component="img"
                                height="140"
                                src={friends}
                                alt="Flight Picture"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <div className="d-flex flex-column align-items-center">
                                       Passengers Info
                                    </div>
                                </Typography>
                                {
                                    (Object.keys(trip.depPassengerInfo).map(info => (
                                        <Card className = 'm-2 p-1'>
                                        <Typography variant="body1" color="text.secondary">
                                            Name Of Passenger: {trip.depPassengerInfo[info].name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                           {trip.depPassengerInfo[info].name}'s Seat :{trip.depPassengerInfo[info].seat}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                           {trip.depPassengerInfo[info].name}'s Cabin : {trip.depPassengerInfo[info].cabin}
                                        </Typography>
                                        </Card>
                                    )))
                                }
                    
                            </CardContent>
                            <Button className = "m-3" type = "default" 
                                onClick = {() => editRoute(trip.Departure, trip.depPassengerInfo, 'Departure', tripIndex, trip.ChosenCabin)} >
                                Edit Seats
                            </Button>
                        </Card>
                </CardContent>
                </FadeInOut>
            </Card>
            </div>
            <div className="d-flex justify-content-center h-100">
            <Card className = 'm-2' style = {{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                    <Typography className='text-center' variant="h5" component="div">
                        Reserved Return Flight Details
                    </Typography>
                    <FadeInOut show={true} duration={500} >
                    <CardContent className = 'd-flex'>
                    <Card sx={{ maxWidth: 345 }} className = "m-2 text-center d-flex flex-column justify-content-between">
                            <CardMedia
                                component="img"
                                height="140"
                                src={download}
                                alt="Flight Picture"
                            />
                            <CardContent className = 'd-flex flex-column justify-content-center '>
                                <Card>
                                <Typography gutterBottom variant="h5" component="div">
                                    <div className="d-flex flex-column align-items-center">
                                        Flight Number : {trip.Return.FlightNumber}
                                    </div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div>Departure Date : {trip.Return.FlightDepDate}</div>
                                    <div>Arrival Date : {trip.Return.FlightArrDate}</div>
                                    <div>Departure Time : {trip.Return.FlightDepTime}</div>
                                    <div>Arrival Time : {trip.Return.FlightArrTime}</div>
                                    <div>Chosen Cabin : {trip.ChosenCabin}</div>
                                    <div>Baggage Allowance : {trip.Return.BaggageAllowance}</div>
                                    <div>Price : {trip.Return.Price}</div>
                                </Typography>
                                </Card>
                            </CardContent>
                            <Button className = "m-3" type = "default" 
                                onClick = {() => changeRoute(trip.Departure, trip.Return, trip.retPassengerInfo, 'Return', tripIndex, trip.ChosenCabin, trip)}>
                                Change Flight
                            </Button>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} className = "m-2 d-flex flex-column justify-content-between">
                        <CardMedia
                            component="img"
                            height="140"
                            src={friends}
                            alt="Flight Picture"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <div className="d-flex flex-column align-items-center">
                                   Passengers Info
                                </div>
                            </Typography>
                            {
                                (Object.keys(trip.retPassengerInfo).map(info => (
                                    <Card className = 'm-2 p-1'>
                                    <Typography variant="body1" color="text.secondary">
                                        Name Of Passenger: {trip.retPassengerInfo[info].name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                       {trip.retPassengerInfo[info].name}'s Seat :{trip.retPassengerInfo[info].seat}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                       {trip.retPassengerInfo[info].name}'s Cabin : {trip.retPassengerInfo[info].cabin}
                                    </Typography>
                                    </Card>
                                )))
                            }
                        </CardContent>
                        <Button className = "m-3" type = "default" 
                            onClick = {() => editRoute(trip.Return, trip.retPassengerInfo, 'Return', tripIndex, trip.ChosenCabin)} >
                            Edit Seats
                        </Button>
                    </Card>
                    </CardContent>
                    </FadeInOut>
                </Card>
            </div>
        </div>
    );
}

export default ReservedTripDetails;