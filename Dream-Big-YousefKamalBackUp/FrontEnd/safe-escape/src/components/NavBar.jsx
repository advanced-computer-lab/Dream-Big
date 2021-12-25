import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import './NavBar.css'

import logoFinal from '../assets/LogoFinal2.png'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Button } from 'antd';

import { React, useState } from 'react'
import { useHistory } from "react-router-dom"
import { UserData } from '../UserContext'

const NavBar = () => {
  const user = UserData();
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Navbar bg="dark" variant="dark" className='d-flex justify-content-between' style={{ height: '120px' }}>
      <Image src={logoFinal} rounded style={{ height: '220px', width: '180px', marginLeft: '2vw' }} />
      <Container>
        <Nav className="me-auto">
          {
            (Object.keys(user).length === 0)
              ?
              (
                <Nav.Link onClick={() => history.push('/users/search')}>Search</Nav.Link>
              )
              :
              ((user.isAdmin)
                ?
                <>
                  <Nav.Link href="/" style={{ color: 'white' }}>List All</Nav.Link>
                  <Nav.Link href="/search" style={{ color: 'white' }}>Search</Nav.Link>
                  <Nav.Link href="/CreateFlights" style={{ color: 'white' }}>Create Flights</Nav.Link>
                </>
                :
                <>
                  <Nav.Link onClick={() => history.push('/users/search')}>Search</Nav.Link>
                  <Nav.Link onClick={() => history.push('/ReservedFlights')}>View Reserved Flights</Nav.Link>
                  <Nav.Link onClick={() => history.push(`/users/update/${user._id}`)}>Update Profile</Nav.Link>
                </>)
          }

        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {
              (Object.keys(user).length === 0)
                ?
                (
                  <>
                    <Nav.Link onClick={() => history.push('/')}>Sign Up</Nav.Link>
                    <Nav.Link onClick={() => history.push('/login')}>Log In</Nav.Link>
                  </>
                )
                :
                <>
                  <div>
                    <Navbar.Text>
                      Welcome : <a href="#login">{user.FirstName} {user.MiddleName} {user.LastName}</a>
                      <div className=" d-flex mt-2 ml-5">
                        <div className=" d-flex flex-column justify-content-center align-items-center">
                          <Avatar size={30} icon={<UserOutlined />} />
                          <div className="ml-3">
                            <Button className="mt-2 ml-5" variant="warning" type="primary" onClick={showModal} style={{ backgroundColor: '#f99965' }}>
                              Show My Details
                            </Button>
                            <Modal title="User Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                              <p>Age: {user.Age}</p>
                              <p>Email: {user.Email}</p>
                              <p>Lives In: {user.LivesIn}</p>
                              <p>Passport Number: {user.PassportNumber}</p>
                              <p>Phone Number: {user.PhoneNumber}</p>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </Navbar.Text>
                  </div>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;