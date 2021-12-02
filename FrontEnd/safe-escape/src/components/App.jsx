import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';
import CreateFlight from "./CreateFlightsComponent/CreateFlight";
import FlightDetails from './ViewComponent/FlightDetails';
import UserSearch from './UserSearchComponent/UserSearch';
import UpdateUser from './UpdateUserComponent/UpdateUser';
import { useState } from "react";
import { SearchCriteriaContext, SearchCriteriaData } from "../SearchCriteriaContext";
import {UserContext, UserData } from "../UserContext";
import {RetFlightContext, RetFlightData ,DepFlightContext, DepFlightData } from "../FlightContext";

const App = () => {
  const [searchCriteria,setSearchCriteria]=useState({});
  const [retFlights,setRetFlights]=useState([]);
  const [depFlights,setDepFlights]=useState([]);
  //const [userConte,setSearchCriteria]=useState({});
  console.log("search criteria", searchCriteria);
  console.log("return flights", retFlights);
  console.log("departure flights", depFlights);

  return (
    <>
    <SearchCriteriaContext.Provider value={searchCriteria}>
    <RetFlightContext.Provider value={retFlights}>
    <DepFlightContext.Provider value={depFlights}>
    <NavBar/>
    <Switch>
      <Route exact path = '/'>
        <ListAllFlight/>
      </Route>

      <Route exact path = '/search'>
        <Search/>
      </Route>

      <Route path="/flights/update/:id">
        <h1>Update Flights Information</h1>
        <Userform />
      </Route>

      <Route path = '/flights/viewdetails/:id'>
        <FlightDetails/>
      </Route>

      <Route exact path='/CreateFlights' component={CreateFlight}>
      </Route>
      <Route exact path='/users/search'>
        <UserSearch setSearchCriteria={setSearchCriteria} setDepFlights={setDepFlights} setRetFlights={setRetFlights}/>
      </Route>

      <Route exact path='/users/update/:id'>
        <UpdateUser/>
      </Route>
    </Switch>
    </DepFlightContext.Provider>
    </RetFlightContext.Provider>
    </SearchCriteriaContext.Provider>
    </>
  );
  }


export default App;
