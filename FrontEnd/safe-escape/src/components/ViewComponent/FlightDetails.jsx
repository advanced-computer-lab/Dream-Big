import { useState, useEffect } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";


const FlightDetails = () => {
  const [Flight, setFlight] = useState({});
  const [fetched, setFetched] = useState(false);
  let { id } = useParams();
  const baseUrl = `http://localhost:8000/flights/FlightDetails/${id}`;

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log('Response',response.data);
      setFlight(response.data)
      setFetched(true)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  return (
    (fetched) && 
    <div style = {{height: '90vh'}}>
    <Table className="table" striped bordered hover size="sm">
    <thead>
    <tr>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col"> FlightDepDate</th>
      <th scope="col">FlightArrDate</th>
      <th scope="col">FlightDepTime</th>
      <th scope="col">FlightArrTime</th>
      <th scope="col">FlightNumber</th>
      <th scope="col">Airport</th>
      <th scope="col">Terminal</th>
      <th scope="col">FirstSeats</th>
      <th scope="col">BusinessSeats</th>
      <th scope="col">EconomySeats</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{Flight.From}</th>
      <td>{Flight.To}</td>
      <td> {Flight.FlightDepDate}</td>
      <td>{Flight.FlightArrDate}</td>
      <td>{Flight.FlightDepTime}</td>
      <td> {Flight.FlightArrTime}</td>
      <td>{Flight.FlightNumber}</td>
      <td>{Flight.Airport}</td>
      <td> {Flight.Terminal}</td>
      <td>{Flight.FirstSeats.availableSeatsNum}</td>
      <td>{Flight.BusinessSeats.availableSeatsNum}</td>
      <td> {Flight.EconomySeats.availableSeatsNum}</td>
      
    </tr>
    </tbody>
</Table>
</div>
  
);

}

export default FlightDetails;