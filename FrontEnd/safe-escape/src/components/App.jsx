import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom';
import Userform from './TextForm';
import {render} from "react-dom";

function App() {
  return (
    <div className="">
      <div className="content">
        <h1>Update Flights Information</h1>
        <Switch>
          <Route path="/flights/:id">
            <Userform />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;