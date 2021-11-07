import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';
import Userform from './UpdateComponent/TextForm';

const App = () => {
  return (
    <>
    <NavBar/>
    <Switch>
      <Route exact path = '/'>
        <ListAllFlight/>
      </Route>

      <Route exact path = '/search'>
        <Search/>
      </Route>

      <Route path="/flights/:id">
        <h1>Update Flights Information</h1>
        <Userform />
      </Route>

      <Route path = '/flights/viewdetails/:fID'>
        View Details
      </Route>
    </Switch>
    </>
  )
}

export default App;
