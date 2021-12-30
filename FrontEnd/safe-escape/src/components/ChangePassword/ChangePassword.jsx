import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ChangePassword.css";
import axios from "axios";
import { UserData } from "../../UserContext";
import Card from 'react-bootstrap/Card'
import FlashMessage from 'react-flash-message'
import TextField from '@mui/material/TextField'

export default function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassaword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showMessage, setShowMessage] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const uzer = UserData();
    console.log(uzer, "uzerssssssssssssssssss");
    console.log(uzer._id, "Uzers ID");

    const baseUrl = `http://localhost:8000/users/changePassword`

    const handleLogIn = () => {
        if(oldPassword.length === 0){
            setMessage('Please Enter a Valid Old Password')
            setShowMessage(true);
        }
        if(newPassword.length === 0){
            setMessage('Please Enter a Valid New Password')
            setShowMessage(true);
        }

        if (newPassword !== confirmPassword) {
            setMessage('Re-Confirm Your New Password Please')
            setShowMessage(true);
        }
        axios.post(baseUrl, {
            id: uzer._id,
            password: oldPassword,
            newPassword: newPassword
        }).then((res) => {
            console.log(res.data, "ressssssssssssssssssssssss");
            setMessage(res.data.message);
            setShowMessage(true);
            if(res.data.message === 'Password Changed successfully !'){
                setTimeout(() => history.push('/users/search'), 1500);
            }
            
        })
    }

    return (
        <div className="ChangePassword">
            <Card className="m-auto w-25 text-center d-flex flex-column justify-content-center align-items-center"
                style={{ height: '50vh', backgroundColor: "white", opacity: '0.85' }}>
                <Card.Title className='mt-3'>Change Password</Card.Title>
                <Card.Body className='d-flex flex-column justify-content-center align-items-center justify-content-around'>
                    <TextField
                        id="standard-password-input"
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <TextField
                        id="standard-password-input"
                        label="New Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => setNewPassaword(e.target.value)}
                    />

                    <TextField
                        id="standard-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        onClick={handleLogIn}>
                        Change Password
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}