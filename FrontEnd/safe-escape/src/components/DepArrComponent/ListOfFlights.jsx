import Card from 'react-bootstrap/Card'

import Pagination from 'react-bootstrap/Pagination'

import { useState, useEffect, useRef } from 'react'

import Flight from './Flight'

const List = props => {
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [displayedFlights, setDisplayedFlights] = useState(props.searchedFlights);

    const myRef = useRef(null)

    const flightsPerPage = 5;

    let pagesVisited = activePage * flightsPerPage;

    useEffect(() => {
            setDisplayedFlights(props.searchedFlights.slice(pagesVisited, pagesVisited + flightsPerPage))

            const pagesNum = Math.ceil(props.searchedFlights.length / flightsPerPage)
            
            let items = []
            
            for (let number = 0; number < pagesNum; number++) {
            let pageIndex = number;

            (items.push(
                <Pagination.Item key={number} active={number === activePage} 
                onClick = {() => changeDisplay(number)}>
                {++pageIndex}
                </Pagination.Item>,
            ))
            }

            setPages(items)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage]);

    const changeDisplay = (pageNum) => {
        setActivePage(pageNum);
        myRef.current.scrollIntoView() 
    }

    return (
        <Card className = 'w-100 m-auto text-center ' style = {{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <Card.Header ref={myRef}>
                <Card.Title >
                    {
                        props.title
                    }
                </Card.Title>
            </Card.Header>
            <Card.Body className = 'd-flex flex-wrap'>
                {
                    (props.searchedFlights !== '') 
                    &&
                    (props.searchedFlights.length === 0 
                    ? 
                        <Card.Title className = 'm-auto text-center'>No flights with this search criteria</Card.Title> 
                    : 
                        displayedFlights.map(flight => (
                            <Flight key = {flight._id} type = {props.type} data = {props.data && {...props.data}} priceToSubtract = {props.priceToSubtract} depflight = { props.depflight && props.depflight} flight = {flight}/>
                        )))
                }
            </Card.Body>

            {
                (props.searchedFlights !== '') 
                &&
                (
                (props.searchedFlights.length !== 0 )
                &&
                (
                    <Card.Footer className = 'd-flex justify-content-center align-items-center'>
                        <Pagination>{pages}</Pagination>
                    </Card.Footer>
                )
                )
            }
        </Card>
    )
}

export default List