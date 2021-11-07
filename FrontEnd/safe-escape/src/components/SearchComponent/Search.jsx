import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import ResultList from './ResultList'
import SideBar from './SideBar'

import axios from 'axios'

import { useState } from 'react'

const Search = () => {
    const [ search, setSearch ] = useState({});
    const [ searchedFlights, setSearchedFlights ] = useState('');
    const [ loading, setLoading ] = useState(false);

    console.log('search', search)

    const handleChange = (field,data) => {
        if(data !== '' && data !== null){
            setSearch({
                ...search,
                [field] : data
            });
        }
        else{
            delete search[field]
            setSearch({
                ...search
            });
        }
    }

    function deleteFlights(id) {
        if (window.confirm('Are you sure you want to delete this Flight?')) {
            fetch(`http://localhost:8000/flights/${id}`, {

                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        axios.get('http://localhost:8000/flights/getSearchedFlights', { 
            params: search
        }).then(res => {
            setSearchedFlights(res.data)
            setLoading(false)
        });
    }

    return (
        <Card className ="m-auto">
            <Card.Body className ="d-flex">

                <Col lg ={2} >
                    <Card className ="p-2">
                        <SideBar search = {search} handleChange = {handleChange} handleSubmit = {handleSubmit}/>
                    </Card>
                </Col>

                <Col lg ={10} className ="w-75 m-auto">
                {
                    (loading === true) ? 
                    (
                    <Box sx={{ margin : '2rem', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                    ) 
                    : 
                    (
                    <ResultList title = { (searchedFlights === '') ?  "Search To Find Flights" : "Searched Flights" } searchedFlights = {searchedFlights === '' ? searchedFlights : searchedFlights.filter((v,i,a)=>a.findIndex(t=>(t.From === v.From && t.To===v.To))===i)} deleteFlights = {deleteFlights}/>
                    )
                }
                </Col>
            </Card.Body>
        </Card>
    )
}


export default Search