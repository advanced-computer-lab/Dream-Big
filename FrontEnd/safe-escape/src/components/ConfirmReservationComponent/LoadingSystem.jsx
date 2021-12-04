import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Result, Button } from 'antd';
import { Steps } from 'antd';


export default function ReservedSuccessfully() {

  const { Step } = Steps;

  const history = useHistory();

  const routeChange = () => {
    let path = ``;
    history.push(path);
  }

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
      setBBA(response.data.BusinessSeats);
      setFS(response.data.FirstSeats);
      setEA(response.data.EconomySeats);
      setPrice(response.data.Price);
    })
  }, [])

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <div className = "mt-3">
        <Steps direction="horizontal" current={2}>
          <Step className="ml-2 mr-2" title="Finished" description="Choose Suitable Flight" />
          <Step className="ml-2 mr-2" title="Finished" description="Confirm Flight Reservation" />
          <Step className="ml-2 mr-2" title="In Progress" description="Enjoy Your Trip" />
        </Steps>
      </div>
      <Result
        status="success"
        title="Successfully Reserved Flight"
        subTitle={`Flight Number: ${flightNumber} has Been Reserved Successfully`}
      />
      <Button type="primary" >Return To Main Menu</Button>
      <div className="mt-3"><Button type="primary">Cancel Booking</Button></div>
    </div>
  );
}