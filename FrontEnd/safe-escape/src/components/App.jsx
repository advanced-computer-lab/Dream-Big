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
  return (
    <div>
      <NavBar />
      <Switch>

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
      </Switch>
    </div>
  );
}


export default App;
