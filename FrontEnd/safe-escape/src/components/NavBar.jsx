import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Safe Escape</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">List All</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    );
};

export default NavBar