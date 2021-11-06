import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch } from 'react-router-dom'
import NavBar from "./NavBar";
import Search from './SearchComponent/Search';
import ListAllFlight from './ListAllComponent/ListAllFlights';

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

      <Route path = '/flights/:fID'>
        Update
      </Route>
    </Switch>
    </>
  )
}

export default App;
