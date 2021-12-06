import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import TextField from '@mui/material/TextField'

import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import FlashMessage from 'react-flash-message'

import { useState } from 'react'
import axios from 'axios'

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
    const location = useLocation();

    // const returnFlight = location.state.hello;
    // const departureFlight = location.state.myFlight;

    // console.log(returnFlight, "Helloretttt");
    // console.log(departureFlight, "Flighttdeppppp");


    const handleUserNameChange = (e) => {
        const user = e.target.value
        setShowMessage(false);
        setUsername(user);
    }
    const handlePassWordChange = (e) => {
        const pass = e.target.value
        setShowMessage(false);
        setPassword(pass);
    }
    const handleLogIn = () => {
        setMessage('Signing You In ...')
        setShowMessage(true)
        axios.post('http://localhost:8000/user/login', {
            username: username,
            password: password
        }).then(res => {
            if (Object.keys(res.data).length === 0) {
                setMessage('Wrong Username or Password')
                props.setLoggedIn(false);
            }
            else {
                props.setLoggedIn(true);
                props.setUser(res.data);
                //let path = `/seats`;
                if (location.state) {
                    const returnFlight = location.state.hello;
                    const departureFlight = location.state.myFlight;
                    setTimeout(() => history.push(`/seats`, { departureFlight, returnFlight }), 1000)
                }
                else
                    history.push('/users/search')
            }
        });
    }
    return (
        <>
            <Card className="m-auto w-25 text-center d-flex flex-column justify-content-center align-items-center"
                style={{ height: '50vh', backgroundColor: "white", opacity: '0.85'}}>
                <Card.Title className='mt-3'>Log In</Card.Title>
                <Card.Body className='d-flex flex-column justify-content-center align-items-center justify-content-around'>
                    <TextField
                        id="standard-basic"
                        label="Username"
                        type="text"
                        variant="standard"
                        onChange={(e) => handleUserNameChange(e)}
                    />

                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => handlePassWordChange(e)}
                    />
                    <div style={{ height: '3vh' }}>
                        {
                            (showMessage) && (
                                <FlashMessage duration={5000}>
                                    <strong>{message}</strong>
                                </FlashMessage>
                            )
                        }
                    </div>
                    <Button variant="warning"
                        disabled={username === '' || password === ''}
                        onClick={handleLogIn}>
                        Log In
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login;