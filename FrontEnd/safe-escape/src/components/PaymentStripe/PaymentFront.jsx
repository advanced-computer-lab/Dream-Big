import { useState } from 'react'
import axios from 'axios'
import * as React from 'react';
import StripeCheckout from "react-stripe-checkout"
import { UserData } from "../../UserContext";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Button } from 'antd';
const PaymentFront = () => {

    const price = 1000;

    const flightNumber = "A102";

    const user = UserData();

    const makePayment = token => {
        const body = {
            token,
            user,
            price,
            flightNumber
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return axios.post(`http://localhost:8000/Payment`, { body })
            .then(response => {
                const { status } = response;
                console.log("RESPONSE ", response);
                console.log("STATUS ", status);
                console.log(body, "body")
            })
            .catch(error => console.log(error));
    };

    return (
        <StripeCheckout stripeKey="pk_test_51K8Gt8JB7TR08zEV5mdyWVlpGCIDrx4iqtbGUOj1ZBSPo5sMAubRPjvcGhOe5uCCL4CRHwp4pNPkyOGiqb5q3qjr00gmVHRoX4"
            token={makePayment}
            name="Pay Your Reservation"
            amount={price * 100}>
        </StripeCheckout>
    )
}
 
export default PaymentFront;
