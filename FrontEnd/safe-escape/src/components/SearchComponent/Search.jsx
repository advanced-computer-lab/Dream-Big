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

    console.log('submit', search)

    const handleChange = (field,data) => {
        if(data !== '' && data !== null){
            if(field.includes('Date')){
                setSearch({
                    ...search,
                    [field] : `${ data.getDate()}/${ data.getMonth() + 1}/${data.getFullYear()}`,
                });
            }
            else if(field.includes('Time')){
                setSearch({
                    ...search,
                    [field] : `${ data.getUTCHours() + 2}:${ data.getUTCMinutes()} `
                });
            }
            else{
                setSearch({
                    ...search,
                    [field] : data
                });
            }
        }
        else{
            if(field.includes('Date')){
                delete search[field]
                setSearch({
                    ...search
                });
            }
            else if(field.includes('Time')){
                delete search[field]
                setSearch({
                    ...search
                });
            }
            else{
                delete search[field]
                setSearch({
                    ...search
                });
            }
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

                <Col lg ={2} className='m-4'>
                    <SideBar search = {search} handleChange = {handleChange} handleSubmit = {handleSubmit}/>
                </Col>

                <Col lg ={10} className ="w-75">
                {
                    (loading === true) ? 
                    (
                    <Box sx={{ margin : '2rem', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                    ) 
                    : 
                    (
                    <ResultList title = { (searchedFlights === '') ?  "Search To Find Flights" : "Searched Flights" } searchedFlights = {searchedFlights === '' ? searchedFlights : searchedFlights.filter((v,i,a)=>a.findIndex(t=>(t.From === v.From && t.To===v.To))===i)}/>
                    )
                }
                </Col>
            </Card.Body>
        </Card>
    )
}


export default Search