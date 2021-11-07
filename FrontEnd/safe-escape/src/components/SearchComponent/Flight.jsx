import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { useHistory } from "react-router-dom"

const Flight = props => {

    const history = useHistory();

    const updateRoute = () =>{ 
        let path = `/flights/${props.flightInfo._id}`; 
        history.push(path);
    }

    const getDetailsRoute = () =>{ 
        let path = `/flights/viewdetails/${props.flightInfo._id}`; 
        history.push(path);
    }

    return (
        <Card className ="m-auto mt-2 w-100" style={{ backgroundColor: '#F0F8FF' }}>
        <Card.Body className = 'd-flex'>

            <Container className = 'm-auto text-right'>
            <Card.Title>Flight</Card.Title>
            <Card.Text>
                Flight Number: {props.flightInfo['FlightNumber']}
            </Card.Text>
            <Card.Text>
                From: {props.flightInfo.From}
            </Card.Text>
            <Card.Text>
                To: {props.flightInfo.To}
            </Card.Text>
            <Button className = 'm-3 w-25' variant="primary" onClick={updateRoute}>
                Update Flight
            </Button>
            <Button className = 'm-3 w-25' variant="info" onClick={getDetailsRoute}>
                View Flight Details
            </Button>
            <Button className = 'm-3 w-25' variant="danger">
                Delete Flight
            </Button>
            </Container>  

        </Card.Body>
        </Card>
    )
}
export default Flight