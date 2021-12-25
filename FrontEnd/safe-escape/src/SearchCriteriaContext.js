import {createContext, useContext} from 'react';

const SearchCriteriaContext = createContext({});

const SearchCriteriaData = () => useContext(SearchCriteriaContext);

export { SearchCriteriaContext, SearchCriteriaData };