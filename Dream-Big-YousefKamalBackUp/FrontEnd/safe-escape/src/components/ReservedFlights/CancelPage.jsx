import React from "react";
import { Card, Modal, Spinner } from "react-bootstrap";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';
// import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CancelPage = (props) => {

    const history = useHistory();

    const routeChange = () => {
        let path = `/users/search`;
        history.push(path);
    }
    
    console.log("this props", props.cancellation);
    // console.log("paramssss", myParams);

    return (
        <>
            {props.cancellation ? (
                <Result
                    title="Booking cancelled!"
                    title="Your payment will be refunded soon "
                    extra={
                        <Button type="primary" onClick = {routeChange}>
                            <Link
                                to="/"
                                style={{ color: "inherit", textDecoration: "inherit" }}
                            >
                                Book new Trip
                            </Link>
                        </Button>
                    }
                />

            ) : (
                <Result
                    title="Booking cancellation failed! Please try again."
                    extra={
                        <Button variant="primary" className="d-flex flex-column align-items-center">
                            <Link
                                to="/ReservedFlights"
                                style={{ color: "inherit", textDecoration: "inherit" }}
                            >
                                View all bookings
                            </Link>
                        </Button>
                    }
                />
            )
            }
        </>
    );

}

export default (CancelPage);