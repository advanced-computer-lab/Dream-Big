import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import './NavBar.css'

import logo from '../assets/acl_logo.jpg'
import logo2 from '../assets/Logo.png'
import logoFinal from '../assets/LogoFinal.png'

import { React } from 'react'
import { useHistory } from "react-router-dom"
import { UserData } from './UserContext'

const NavBar = () => {
  const user = UserData();
  const history = useHistory();

    return (
        <Navbar bg="dark" variant="dark" className= 'd-flex justify-content-between'>
          <Image src={logoFinal} rounded style = {{height : '150px', marginLeft : '2vw'}}/>
          <Container>
            <Nav className="me-auto">
              <Nav.Link onClick = {() => history.push('/listAll') }>List All</Nav.Link>
              <Nav.Link onClick = {() => history.push('/search') }>Search</Nav.Link>
              <Nav.Link onClick = {() => history.push('/seats') }>Seats</Nav.Link>
              <Nav.Link onClick = {() => history.push('/CreateFlights') }>Create Flights</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {
                  (Object.keys(user).length === 0) 
                  ?
                  (
                    <>
                    <Nav.Link onClick = {() => history.push('/')}>Sign Up</Nav.Link>
                    <Nav.Link onClick = {() => history.push('/login')}>Log In</Nav.Link>
                    </>
                  )
                  :
                  <>
                  <Navbar.Text>
                    Welcome : <a href="#login">{user.username}</a>
                  </Navbar.Text>
                  </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default NavBar;