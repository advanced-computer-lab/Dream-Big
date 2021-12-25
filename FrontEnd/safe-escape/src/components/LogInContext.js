import { createContext, useContext } from 'react';

const UserName = createContext("");
const UserNameData = () => useContext(UserName);

const PassWord = createContext("");
const PassWordData = () => useContext(PassWord);

export { UserName, UserNameData, PassWord, PassWordData };
