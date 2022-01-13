import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import List from "./ListOfFlights";


const ViewReturn = (props) => {
  const history = useHistory();

  const location = useLocation();
  const flight = location.state.hello;
  console.log(flight, "flightttttttttttttttt")

  const routeChange = (slide) => {
    let path = `/ReturnFlightDetails`;
    history.push(path, { slide, flight });
  }
  const handleSubmit=() => {
    let path = `search`;
    axios.routeChange(path);
  }
    return(
      <div>
        <div className="App" >
           <List title = { 'Searched Return Flights' } priceToSubtract = {0} type = "Return" depflight = {flight} searchedFlights = {props.retFlights}/>
        </div>
        <div>
          <Button variant="warning" onClick={() => history.push('/users/search')}>Back To Search</Button>
        </div>
      </div>
      );

  }
export default ViewReturn;