import {createContext, useContext} from 'react';

const DepFlightContext = createContext([]);

const DepFlightData = () => useContext(DepFlightContext);

const RetFlightContext = createContext([]);

const RetFlightData = () => useContext(RetFlightContext);

export { RetFlightContext, RetFlightData ,DepFlightContext, DepFlightData};