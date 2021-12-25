import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Result, Button, Card } from 'antd';
import { Steps } from 'antd';
import { useLocation } from "react-router-dom";
import { UserData } from '../../UserContext'
import StripeCheckout from "react-stripe-checkout";
import PaymentFront from '../PaymentStripe/PaymentFront';

export default function GreenConfirmation() {

  const { Step } = Steps;

  const history = useHistory();
  const location = useLocation();

  const first = location.state.dflight;
  const second = location.state.rflight;

  const priceTotal = first.Price + second.Price;

  console.log(first, "first")
  console.log(priceTotal, "price total");

  const cabins2 = location.state.cabins;
  const depSeats2 = location.state.depSeats;

  const retSeats2 = location.state.retSeats;

  const user = UserData();

  const makePayment = token => {
    const body = {
      token,
      user,
      priceTotal,
      flightNumber
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return axios.post(`http://localhost:8000/Payment`, { body })
      .then(response => {
        const { status } = response;
        console.log("ay haga");
        history.push('/ReservedFlights');
      })
      .catch(error => console.log(error));
  };

  const routeChange2 = () => {
    let path = `/BookingConfirmation`;
    history.push(path, { first, second, cabins2, depSeats2, retSeats2 });
  }


  const routeChange3 = () => {
    let path = `/Payment`;
    history.push(path, { first, second, cabins2, depSeats2, retSeats2 });
  }

  const [paid, setpaid] = useState(false);

  const [DepDate, setDD] = useState();
  const [ArrDate, setAD] = useState();
  const [DepTime, setDT] = useState();
  const [ArrTime, setAT] = useState();
  const [flightNumber, setFN] = useState();
  const [BaggageAllowance, setBA] = useState();
  const [FirstSeats, setFS] = useState();
  const [BusinessSeats, setBBA] = useState();
  const [EconomySeats, setEA] = useState();
  const [Price, setPrice] = useState();

  let { id } = useParams();
  const baseUrl = `http://localhost:8000/flights/FlightDetails/6186c408f38e49ec1e0d3011`;

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setDD(response.data.FlightDepDate);
      setAD(response.data.FlightArrDate);
      setDT(response.data.FlightDepTime);
      setAT(response.data.FlightArrTime);
      setFN(response.data.FlightNumber);
      setBA(response.data.BaggageAllowance);
      setBBA(response.data.BusinessSeats.availableSeatsNum);
      setFS(response.data.FirstSeats.availableSeatsNum);
      setEA(response.data.EconomySeats.availableSeatsNum);
      setPrice(response.data.Price);
    })
  }, [])

  return (
    <div className="d-flex flex-column align-items-center">
      <Card className='mt-5' style={{ backgroundColor: "white", opacity: '0.85' }}>
        <div className="mt-3">
          <Steps direction="horizontal" current={2}>
            <Step className="ml-2 mr-2" title="Finished" description="Choose Suitable Flight" />
            <Step className="ml-2 mr-2" title="Finished" description="Confirm Flight Reservation" />
            <Step className="ml-2 mr-2" title="In Progress" description="Enjoy Your Trip" />
          </Steps>
        </div>
        <Result
          status="success"
          title="Successfully Reserved Flight"
        />
        <div className="d-flex flex-column align-items-center">
          <StripeCheckout stripeKey="pk_test_51K8Gt8JB7TR08zEV5mdyWVlpGCIDrx4iqtbGUOj1ZBSPo5sMAubRPjvcGhOe5uCCL4CRHwp4pNPkyOGiqb5q3qjr00gmVHRoX4"
            token={makePayment}
            name="Pay Your Reservation"
            amount={priceTotal * 100}
            setpaid = {setpaid}>
          </StripeCheckout>
        </div>
      </Card>
    </div>
  );
}