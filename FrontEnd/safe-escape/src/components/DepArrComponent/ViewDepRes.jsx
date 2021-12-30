//This component is the departurre list of fights after editing the flight
//contains flight price difference
//m3mlt4 al redirection al sahh
import axios from "axios";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import List from "./ListOfFlights";

const ViewDepRes = (props) => {
  const history = useHistory();

  const location = useLocation();
  //const flight = location.state.hello;
  console.log(location.state, "flightttttttttttttttt")

  const routeChange = (slide) => {
    let path = `/ReturnFlightDetails`;
    history.push(path, { ...location.state, slide });
  }
  const handleSubmit=() => {
    let path = `search`;
    axios.routeChange(path);
  }
 
    return(
    
      <div>
        <div className="App" >
           <List title = { 'Searched Departure Flights' } data = { {...location.state} } priceToSubtract = {props.ResFlights.Price} type = "Departure" searchedFlights = {props.depFlights}/>
        </div>
        <div>
          <Button className="btn-warning" variant="success" onClick={() => history.push('/users/search')}>Back </Button>
        </div>
      </div>
       );

  }
        export default ViewDepRes;