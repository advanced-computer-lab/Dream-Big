import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CreateFlight from "./CreateFlights/CreateFlight";

const App = () => {
  return (
    // <>
    // <NavBar/>
    // <CreateFlight/>
    // </>
    <Router>
           <div className="App">
           {/* <ul>
              <li>
                <Link to="/CreateFlights">Create Flights</Link>
              </li>
             
           </ul> */}
           <NavBar/>
           <Route exact path='/CreateFlights' component={CreateFlight}></Route>
           {/* <Route exact path='/' component={NavBar}></Route> */}
           </div>
       </Router>
  )
}

export default App;
