import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../assets/background.jpeg';

import {Switch, Route } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';
import CreateFlight from "./CreateFlightsComponent/CreateFlight";
import FlightDetails from './ViewComponent/FlightDetails';
import SelectSeats from './SelectSeatComponent/SelectSeat';
import Login from './LogInComponent/LogIn';
import Restriction from './RestrictionComponent/Restriction';

import { React, useState } from 'react';
import { UserContext } from './UserContext';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  
  console.log('user', user)

  return (
    <>
    <UserContext.Provider value={user}>
    <NavBar/>
    <div className = "d-flex justify-content-center align-items-center " style={{ overflow: 'true', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
      {
        loggedIn === false
        ? 
        <div style={{marginTop: '4vh', height: '80vh', width: '100%' }}>
        <Login setLoggedIn = {setLoggedIn} setUser = {setUser}/>
        </div>
        :
        (
          (user.isAdmin) 
          ?
          <>
          <Switch>
            <Route exact path = '/listAll'>
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
          </Switch>
          </>
          :
          <>
          <Switch>
            <Route exact path = '/listAll'>
              <Restriction/>
            </Route>
            <Route exact path = '/search'>
              <Search/>
            </Route>
            <Route exact path = '/seats'>
              <SelectSeats/>
            </Route>
            <Route exact path='/CreateFlights' component={Restriction}>
            </Route>
          </Switch>
          </>
        )
      }
    </div>
    </UserContext.Provider>
    </>
  );
  }


export default App;


// className = "d-flex justify-content-center align-items-center " style={{ overflow: 'true', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}