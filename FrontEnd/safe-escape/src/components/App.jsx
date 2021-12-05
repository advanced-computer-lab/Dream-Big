import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';
import CreateFlight from "./CreateFlightsComponent/CreateFlight";
import FlightDetails from './ViewComponent/FlightDetails';
import ViewReservedFlight from "./ReservedFlights/ViewReservedFlights";
import CancelPage from "./ReservedFlights/CancelPage";
import { useState, useEffect } from 'react';
import { CancellationContext, CancellationData } from "../CancellationContext";
import "antd/dist/antd.css";

const App = () => {
  const [cancellation, setCancellation] = useState(false);
  return (
    <>
      {/* <CancellationContext.Provider value={cancellation}> */}
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <ListAllFlight />
        </Route>

        <Route exact path='/ReservedFlights'>
          <ViewReservedFlight setCancellation={setCancellation} />
        </Route>

        <Route exact path='/CancelPage'>
          <CancelPage cancellation={cancellation} />
        </Route>

        <Route exact path='/search'>
          <Search />
        </Route>

        <Route path="/flights/update/:id">
          <h1>Update Flights Information</h1>
          <Userform />
        </Route>

        <Route path='/flights/viewdetails/:id'>
          <FlightDetails />
        </Route>

        <Route exact path='/CreateFlights' component={CreateFlight}>
        </Route>
      </Switch>

      {/* </CancellationContext.Provider> */}
    </>

  );
}


export default App;
