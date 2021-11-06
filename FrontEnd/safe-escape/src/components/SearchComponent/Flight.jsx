import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { useHistory } from "react-router-dom"

const Flight = props => {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/flights/${props.flightInfo._id}`; 
        history.push(path);
    }

    return (
        <Card className ="m-auto mt-2 w-100" style={{ backgroundColor: '#F0F8FF' }}>
        <Card.Body className = 'd-flex'>

            <Container className = 'm-auto text-right'>
            <Card.Title>Flight</Card.Title>
            <Card.Text>
                From: {props.flightInfo.From}
            </Card.Text>
            <Card.Text>
                To: {props.flightInfo.To}
            </Card.Text>
            <Card.Text>
                Date: {props.flightInfo['Flight Date']}
            </Card.Text>
            <Button className = 'm-3 w-25' variant="info" onClick={routeChange}>
                Update Flight
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