//This component is the arrival list of fights after editing the flight
//contains flight price difference
// 3mlt route f app.js bs m3mlt4 al redirection al sahh

import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import List from "./ListOfFlights";

const ViewArrivalnRes = (props) => {
  const history = useHistory();

  const location = useLocation();
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
           <List title = { 'Searched Departure Flights' } data = { {...location.state} } priceToSubtract = {props.ResFlights.Price} type = "Departure" 
           searchedFlights = {props.retFlights}/>
        </div>
        <div>
          <Button variant="warning" onClick={() => history.push('/users/search', {...location.state})}>Back To Search</Button>
        </div>
      </div>

       );

  }
        export default ViewArrivalnRes;