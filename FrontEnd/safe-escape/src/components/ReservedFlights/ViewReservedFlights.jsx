
import { useState, useEffect } from 'react';


import { init } from 'emailjs-com';

import { send } from 'emailjs-com';

import React, { Component } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Card } from 'react-bootstrap';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import CancelPage from './CancelPage';
import { UserData } from '../../UserContext'

import { useHistory } from "react-router-dom"

init("user_ExRC07sKMOuwyw6rSr9R9");
const ViewReservedFlight = (props) => {
    const [bookings, setBookings] = React.useState([]);
    const [booking, setBooking] = useState({});
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(true);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingCheckIn, setLoadingCheckIn] = useState(false);
    //const [flights, setFlights] = useState('');

    const [newList, setNewList] = useState([]);

    const [toSend, setToSend] = useState({});

    const user = UserData();

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };



    // function handleClose() {
    //     return setShow(false);
    // }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cancelBookingView = (booking) => {
        setBooking(booking);
        handleShow();
    }
    // const [cancellation, setCancellation] = useState(false);

    console.log("show", show);
    console.log("open", open);

    const history = useHistory();

    function confirmCancel(_id) {

        setNewList(bookings.filter((booking) => booking._id !== _id));

        setBookings(newList);
        console.log(newList)
        setLoadingCancel(true);
        // await props.cancelBookingView(state.booking._id);


        axios.put('http://localhost:8000/users/61a49102b62a597189c517f0', { newList }).then(res => {
            setLoadingCancel(false);
            props.setCancellation(true);
            let path = `/CancelPage`;
            history.push(path, { id: _id });
            // <CancelPage cancellation={cancellation} />

        });

        // console.log("cancellationnnnnn", cancellation);




    }

    const routeChange = () => {
        let path = `/BookingConfirmation`;
        history.push(path, {});
    }

    console.log(user._id, "ID");

    useEffect(() => {
        setOpen(true)
        axios.get(`http://localhost:8000/users/${user._id}/getReservedFlights`).then(res => {
            console.log()
            setBookings(res.data)
            setOpen(false)
            console.log("result", res.data)
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    return (
        <div style={{ backgroundImage: "url(/airplane-sky-flight-clouds.jpg)", backgroundSize: '100%', height: '100vh', zIndex: '0' }}><div>
            <h1>View all bookings</h1>
            <Backdrop
                // className={classes.backdrop}
                open={open}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {bookings.length > 0 ? (
                <>
                    {bookings.map((booking) => (
                        <>
                            <Card>
                                <Card.Header>{booking._id}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        {/* <h1> {booking.User.FirstName + " " + booking.User.LastName}</h1> */}
                                        <h1>houguuigiu</h1>
                                    </Card.Title>
                                    <Card.Text>
                                        <table style={{ width: "100%", tableLayout: "fixed" }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: "1.2rem" }}>
                                                        {booking.Airport}
                                                        <br />
                                                        {booking.Terminal}
                                                    </td>
                                                    <td style={{ fontSize: "1.2rem" }}>
                                                        {booking.From}
                                                    </td>
                                                    <td>
                                                        <span class="plane">
                                                            <svg
                                                                clip-rule="evenodd"
                                                                fill-rule="evenodd"
                                                                height="30"
                                                                width="30"
                                                                image-rendering="optimizeQuality"
                                                                shape-rendering="geometricPrecision"
                                                                text-rendering="geometricPrecision"
                                                                viewBox="0 0 500 500"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g stroke="#222">
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-width="30"
                                                                        x1="300"
                                                                        x2="55"
                                                                        y1="390"
                                                                        y2="390"
                                                                    />
                                                                    <path
                                                                        d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                                                                        fill="#222"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="10"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td style={{ fontSize: "1.2rem" }}>
                                                        {booking.To}
                                                    </td>
                                                    <td style={{ fontSize: "1.2rem" }}>
                                                        {booking.FlightDepDate}
                                                    </td>
                                                    <td style={{ fontSize: "1.2rem" }}>
                                                        {/* <span style={{ float: "right" }}> */}
                                                        {booking.FlightDepTime}
                                                        {/* </span> */}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <span style={{ textAlign: "start" }}></span>
                                    </Card.Text>
                                    <Button
                                        variant="secondary"
                                        style={{ marginRight: "2rem" }}
                                        onClick={() => cancelBookingView(booking)}
                                    // href={"/book/" + flight._id}
                                    >
                                        Cancel booking
                                    </Button>
                                    <Button
                                        variant="primary"
                                        // onClick = {routeChange}
                                    >
                                        {loadingCheckIn ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : null}
                                        Check in
                                    </Button>
                                </Card.Body>
                            </Card>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cancel bookings</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to cancel booking ?
                                    <br />
                                    Your payment will be refunded soon
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} >
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={() => {
                                        send(
                                            'service_g3ejrbg',
                                            'template_ptlxprp',
                                            toSend,

                                            'user_ExRC07sKMOuwyw6rSr9R9'
                                        )
                                            .then((response) => {
                                                console.log('SUCCESS!', response.status, response.text);
                                            })
                                            .catch((err) => {
                                                console.log('FAILED...', err);
                                            }); confirmCancel(booking._id)
                                    }}>
                                        {loadingCancel ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : null}


                                        Confirm
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    ))}
                </>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Text>You have not booked any flight</Card.Text>
                        <Button variant="primary">
                            <Link
                                to="/users/search"
                                style={{ color: "inherit", textDecoration: "inherit" }}
                            >
                                Search flight
                            </Link>
                        </Button>
                    </Card.Body>
                </Card>
            )
            }

        </div ></div>

    );
};


export default ViewReservedFlight