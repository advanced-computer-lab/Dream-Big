import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";

import { Switch, Route } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import { Modal, Button } from 'antd';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';
import CreateFlight from "./CreateFlightsComponent/CreateFlight";
import FlightDetails from './ViewComponent/FlightDetails';
import UserSearch from './UserSearchComponent/UserSearch';
import UpdateUser from './UpdateUserComponent/UpdateUser';
import { useState } from "react";
import { SearchCriteriaContext, SearchCriteriaData } from "../SearchCriteriaContext";
import { UserContext, UserData } from "../UserContext";
import { RetFlightContext, RetFlightData, DepFlightContext, DepFlightData } from "../FlightContext";
import MediaCard from './ConfirmReservationComponent/ConfirmMessage';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import ReservedSuccessfully from './ConfirmReservationComponent/LoadingSystem';
import SeeDets from './ConfirmReservationComponent/SeeDetails';
import SeeSum from './ConfirmReservationComponent/SeeSummary';
import PrintComponent from './ConfirmReservationComponent/PrintButton';
import MyCarousel from './ConfirmReservationComponent/Demo';
import ViewReturn from './DepArrComponent/ViewArrival';
import ViewReturn2 from './DepArrComponent/ViewReturn';
import ViewDepDetails from './DepArrComponent/ViewDepDetails';

const { Step } = Steps;

const App = () => {
  const [searchCriteria, setSearchCriteria] = useState({});
  const [retFlights, setRetFlights] = useState([]);
  const [depFlights, setDepFlights] = useState([]);
  //const [userConte,setSearchCriteria]=useState({});
  console.log("search criteria", searchCriteria);
  console.log("return flights", retFlights);
  console.log("departure flights", depFlights);

  return (
    <>
      <SearchCriteriaContext.Provider value={searchCriteria}>
        <RetFlightContext.Provider value={retFlights}>
          <DepFlightContext.Provider value={depFlights}>
            <NavBar />
            <Switch>

              <Route exact path='/'>
                <ListAllFlight />
              </Route>

              <Route exact path='/ViewReturnFlight'>
                <div className="d-flex flex-column align-items-center mt-2">
                  <div className="d-flex flex-column align-items-center mt-3">
                    <Steps direction="horizontal" current={0}>
                      <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                      <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                      <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                    </Steps>
                  </div>
                </div>
                <ViewReturn />
              </Route>

              <Route exact path='/ViewOutBoundFlight'>
                <div className="d-flex flex-column align-items-center mt-2">
                  <div className="d-flex flex-column align-items-center mt-3">
                    <Steps direction="horizontal" current={0}>
                      <Step className="ml-2 mr-2" title="In Progress" description="Choose Suitable Flight" />
                      <Step className="ml-2 mr-2" title="Waiting" description="Confirm Flight Reservation" />
                      <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                    </Steps>
                  </div>
                </div>
                <ViewReturn2 />
              </Route>

              <Route exact path='/ArrivalFlightDetails'>
                <ViewDepDetails />
              </Route>

              <Route exact path='/ReturnFlightDetails'>
                <MediaCard />
              </Route>

              <Route exact path='/BookingConfirmation'>
                <SeeSum />
              </Route>

              <Route exact path='/reserved'>
                <ReservedSuccessfully />
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
              <Route exact path='/users/search'>
                <UserSearch setSearchCriteria={setSearchCriteria} setDepFlights={setDepFlights} setRetFlights={setRetFlights} />
              </Route>

              <Route exact path='/users/update/:id'>
                <UpdateUser />
              </Route>
            </Switch>
          </DepFlightContext.Provider>
        </RetFlightContext.Provider>
      </SearchCriteriaContext.Provider>
    </>
  );
}


export default App;
