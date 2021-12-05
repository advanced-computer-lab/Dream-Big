import {createContext, useContext} from 'react';

const UserContext = createContext({});

const UserData = () => useContext(UserContext);

export { UserContext, UserData };