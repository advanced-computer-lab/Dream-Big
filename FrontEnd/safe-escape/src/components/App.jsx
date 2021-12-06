import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../assets/background.jpeg';
import "antd/dist/antd.css";

import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';
import CreateFlight from "./CreateFlightsComponent/CreateFlight";
import FlightDetails from './ViewComponent/FlightDetails';
import SelectSeats from './SelectSeatComponent/SelectSeat';
import Login from './LogInComponent/LogIn';
import Restriction from './RestrictionComponent/Restriction';

import { React } from 'react';

import ViewReservedFlight from "./ReservedFlights/ViewReservedFlights";
import CancelPage from "./ReservedFlights/CancelPage";
import { useState, useEffect } from 'react';
import UserSearch from './UserSearchComponent/UserSearch';
import UpdateUser from './UpdateUserComponent/UpdateUser';
import { SearchCriteriaContext, SearchCriteriaData } from "../SearchCriteriaContext";
import { UserData, UserContext } from "../UserContext";
import { RetFlightContext, RetFlightData, DepFlightContext, DepFlightData } from "../FlightContext";
import MediaCard from './ConfirmReservationComponent/ConfirmMessage';
import { Card, Steps } from 'antd';
import ReservedSuccessfully from './ConfirmReservationComponent/LoadingSystem';
import SeeDets from './ConfirmReservationComponent/SeeDetails';
import SeeSum from './ConfirmReservationComponent/SeeSummary';
import ViewReturn from './DepArrComponent/ViewArrival';
import ViewReturn2 from './DepArrComponent/ViewReturn';
import ViewDepDetails from './DepArrComponent/ViewDepDetails';
import ReservedSuccessfully2 from './ConfirmReservationComponent/LoadingSystem2';
import GreenConfirmation from './ConfirmReservationComponent/GreenConfirmation';

const App = () => {

  const { Step } = Steps;
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  console.log('user', user)

  const [cancellation, setCancellation] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [retFlights, setRetFlights] = useState([]);
  const [depFlights, setDepFlights] = useState([]);

  return (
    <>
      <UserContext.Provider value={user}>
        <SearchCriteriaContext.Provider value={searchCriteria}>
          <RetFlightContext.Provider value={retFlights}>
            <DepFlightContext.Provider value={depFlights}>
              <NavBar />
              <div style={{ backgroundImage: "url(/airplane-sky-flight-clouds.jpg)", backgroundSize: '100%', height: '100vh', zIndex: '0' }} className="flex-column justify-content-center align-items-center">
                {
                  loggedIn === false
                    ?
                    <Switch>
                      <Route exact path='/login'>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
                          <Login setLoggedIn={setLoggedIn} setUser={setUser} />
                        </div>
                      </Route>

                      <Route exact path='/users/search'>
                        <UserSearch setSearchCriteria={setSearchCriteria} setDepFlights={setDepFlights} setRetFlights={setRetFlights} />
                      </Route>

                      <Route exact path='/ViewOutBoundFlight'>
                        <div className="d-flex flex-column align-items-center">
                          <div className="d-flex flex-column align-items-center mt-3">
                            <Steps direction="horizontal" current={0}>
                              <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                              <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                              <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                            </Steps>
                          </div>
                        </div>
                        <ViewReturn2 depFlights={depFlights} />
                      </Route>

                      <Route exact path='/ArrivalFlightDetails'>
                        <ViewDepDetails />
                      </Route>

                      <Route exact path='/ViewReturnFlight'>
                        <div className="d-flex flex-column align-items-center">
                          <div className="d-flex flex-column align-items-center mt-3">
                            <Steps direction="horizontal" current={0}>
                              <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                              <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                              <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                            </Steps>
                          </div>
                        </div>
                        <ViewReturn retFlights={retFlights} />
                      </Route>

                      <Route exact path='/ReturnFlightDetails'>
                        <MediaCard />
                      </Route>

                      <Route path='/'>
                        <Redirect to="login" />
                      </Route>

                    </Switch>
                    :
                    (
                      (user.isAdmin)
                        ?
                        <>
                          <Switch>
                            <Route exact path='/listAll'>
                              <ListAllFlight />
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
                        </>
                        :
                        <>
                          <Switch>
                            <Route exact path='/listAll'>
                              <Restriction />
                            </Route>
                            <Route exact path='/search'>
                              <Search />
                            </Route>
                            <Route exact path='/seats'>
                              <SelectSeats />
                            </Route>

                            <Route exact path='/ReservedFlights'>
                              <div className="d-flex flex-column justify-content-center align-items-center">
                                <Card className="d-flex flex-column justify-content-center align-items-center"
                                style = {{marginTop: '25vh', opacity: '85%'}}>
                                  <ViewReservedFlight setCancellation={setCancellation} />
                                </Card>
                              </div>
                            </Route>

                            <Route exact path='/BookingConfirmation'>
                              <div>
                                <SeeSum />
                              </div>
                            </Route>


                            <Route exact path='/BookingTripInfo'>
                              <SeeDets />
                            </Route>

                            <Route exact path='/reserved'>
                              <ReservedSuccessfully />
                            </Route>

                            <Route exact path='/reservedOneWay'>
                              <ReservedSuccessfully2 />
                            </Route>

                            <Route exact path='/RoundTripReserved'>
                              <GreenConfirmation />
                            </Route>

                            <Route exact path='/CancelPage'>
                              <CancelPage cancellation={cancellation} />
                            </Route>
                            <Route exact path='/CreateFlights' component={Restriction}>
                            </Route>

                            <Route exact path='/users/update/:id'>
                              <UpdateUser />
                            </Route>
                            <Route exact path='/users/search'>
                              <UserSearch setSearchCriteria={setSearchCriteria} setDepFlights={setDepFlights} setRetFlights={setRetFlights} />
                            </Route>

                            <Route exact path='/ViewOutBoundFlight'>
                              <div className="d-flex flex-column align-items-center">
                                <div className="d-flex flex-column align-items-center mt-3">
                                  <Steps direction="horizontal" current={0}>
                                    <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                                    <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                                    <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                                  </Steps>
                                </div>
                              </div>
                              <ViewReturn2 depFlights={depFlights} />
                            </Route>

                            <Route exact path='/ArrivalFlightDetails'>
                              <ViewDepDetails />
                            </Route>

                            <Route exact path='/ViewReturnFlight'>
                              <div className="d-flex flex-column align-items-center">
                                <div className="d-flex flex-column align-items-center mt-3">
                                  <Steps direction="horizontal" current={0}>
                                    <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                                    <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                                    <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                                  </Steps>
                                </div>
                              </div>
                              <ViewReturn retFlights={retFlights} />
                            </Route>

                            <Route exact path='/ReturnFlightDetails'>
                              <MediaCard />
                            </Route>
                          </Switch>
                        </>
                    )
                }
              </div>
            </DepFlightContext.Provider>
          </RetFlightContext.Provider>
        </SearchCriteriaContext.Provider>
      </UserContext.Provider>
    </>
  )
}
export default App;