import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import logo from '../assets/acl_logo.jpg'

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Image src={logo} rounded style = {{height : '100px', marginLeft : '2vw'}}/>
        <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">List All</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/CreateFlights">Create Flights</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    );
};

export default NavBar