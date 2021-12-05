import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import './NavBar.css'

import logo from '../assets/acl_logo.jpg'
import logo2 from '../assets/Logo.png'
import logoFinal from '../assets/LogoFinal.png'

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Image src={logoFinal} rounded style = {{height : '200px 200px', marginLeft : '2vw'}}/>
        {/* <h2 style={{color:'#f99965', marginLeft : '5px'}}>Safe Escape</h2> */}
        <Container>
        <Nav className="me-auto">
          <Nav.Link href="/" style={{color:'white'}}>List All</Nav.Link>
          <Nav.Link href="/search" style={{color:'white'}}>Search</Nav.Link>
          <Nav.Link href="/CreateFlights" style={{color:'white'}}>Create Flights</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    );
};

export default NavBar;