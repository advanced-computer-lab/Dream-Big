import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom';


import NavBar from "./NavBar";
import FlightDetails from './FlightDetails';

const App = () => {
  return (
    <div>
    <Switch>
          <Route path="/flights/:id">
            <NavBar/>
            <FlightDetails/>
          </Route>
        </Switch>

    
  
    </div>
  )
}

export default App;
