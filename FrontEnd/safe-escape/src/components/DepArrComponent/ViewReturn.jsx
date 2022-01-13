import axios from "axios";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import './StyleB.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import List from "./ListOfFlights";

const ViewReturn2 = (props) => {

  const history = useHistory();


  const routeChange = (slide) => {
    let path = `ArrivalFlightDetails`;
    history.push(path, { slide });
  }

  const handleSubmit = () => {
    let path = `search`;
    axios.routeChange(path);
  }

  return (
    <div>
      <div className="App" >
         <List title = { 'Searched Departure Flights' } priceToSubtract = {0} type = "Departure" searchedFlights = {props.depFlights}/>
      </div>
      <div>
        <Button variant="warning" onClick={() => history.push('/users/search')}>Back To Search</Button>
      </div>
    </div>

  );
}

export default ViewReturn2;