import {createContext, useContext} from 'react';

const ResFlightContext = createContext([]);

const ResFlightData = () => useContext(ResFlightContext);

const DepFlightContext = createContext([]);

const DepFlightData = () => useContext(DepFlightContext);

const RetFlightContext = createContext([]);

const RetFlightData = () => useContext(RetFlightContext);

export { RetFlightContext, RetFlightData ,DepFlightContext, DepFlightData, ResFlightData,ResFlightContext};