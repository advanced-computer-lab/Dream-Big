import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { useState, useEffect } from 'react'
import axios from 'axios'

import ResultList from '../SearchComponent/ResultList'

const ListAllFlight = () => {
    const [ displayedFlights, setDisplayedFlights] = useState('');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {

        setLoading(true);
        axios.get('http://localhost:8000/flights/getAllFlights').then(res => {
            setDisplayedFlights(res.data)
            setLoading(false)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {
            (loading === true) ? 
            (
            <Box sx={{ margin : '2rem', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
            ) 
            : 
            (
            <ResultList  title = 'All Flights' searchedFlights = {displayedFlights === '' ? displayedFlights : displayedFlights.filter((v,i,a)=>a.findIndex(t=>(t.From === v.From && t.To===v.To))===i)}/>
            )
        }
        </>
    )
}

export default ListAllFlight