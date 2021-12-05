import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { useState, useEffect } from 'react'
import axios from 'axios'

import ResultList from '../SearchComponent/ResultList'

const ListAllFlight = () => {
    const [ displayedFlights, setDisplayedFlights] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ deleted, setDeleted ] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/flights/getAllFlights').then(res => {
            setDisplayedFlights(res.data)
            setLoading(false)
            setDeleted(false)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleted]);

    function deleteFlights(id) {
        if (window.confirm('Are you sure you want to delete this Flight?')) {
            fetch(`http://localhost:8000/flights/${id}`, {

                method: 'DELETE'
            }).then((result) => {
                setDeleted(true)
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }
    }

    return (
        <>
        {
            (loading === true) ? 
            (
            <Box sx={{ margin : '2rem', display: 'flex', justifyContent: 'center', 
            height: '120vh' }}>
                <CircularProgress />
            </Box>
            ) 
            : 
            (
            <ResultList  title = 'All Flights' searchedFlights = {displayedFlights === '' ? displayedFlights : displayedFlights.filter((v,i,a)=>a.findIndex(t=>(t.From === v.From && t.To===v.To))===i)} deleteFlights = {deleteFlights}/>
            )
        }
        </>
    )
}

export default ListAllFlight