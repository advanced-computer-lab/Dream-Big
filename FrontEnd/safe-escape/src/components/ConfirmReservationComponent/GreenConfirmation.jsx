import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Result, Button } from 'antd';
import { Steps } from 'antd';
import { useLocation } from "react-router-dom";

export default function GreenConfirmation() {

  const { Step } = Steps;

  const history = useHistory();
  const location = useLocation();

  const first = location.state.dflight;
  const second = location.state.rflight;
  
  const cabins2 = location.state.cabins;
  const depSeats2 = location.state.depSeats;
  
  const retSeats2 = location.state.retSeats;

  const routeChange2 = () => {
    let path = `/BookingConfirmation`;
    history.push(path, {first, second, cabins2, depSeats2, retSeats2});
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
      setBBA(response.data.BusinessSeats.availableSeatsNum);
      setFS(response.data.FirstSeats.availableSeatsNum);
      setEA(response.data.EconomySeats.availableSeatsNum);
      setPrice(response.data.Price);
    })
  }, [])

  return (
    <div className="d-flex flex-column align-items-center">
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
        subTitle={`Flight Number: has Been Reserved Successfully`}
      />
      <Button type="primary" onClick = {routeChange2}>View Round-Trip Summary</Button>
    </div>
  );
}