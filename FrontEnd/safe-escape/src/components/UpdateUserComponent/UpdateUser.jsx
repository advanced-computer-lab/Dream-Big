import axios from "axios";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { UserData } from '../../UserContext'
import Card from 'react-bootstrap/Card';
import { useHistory } from "react-router-dom"

const UpdateUser = (props) => {
    const [toBeUpdatedInUser, setToBeUpdatedInUser] = useState({});
     //isEmpty
     const [isEmpty,setIsEmpty]= useState(true);
     const history = useHistory();
     //
     const user = UserData();
    const baseURL = `http://localhost:8000/users/userInfo/${user._id}`;

    const [validated, setValidated] = useState(false);

    const handleSubmit = async(event) => {
        
        const form = event.currentTarget;
        console.log('form', form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            setValidated(true);
            event.preventDefault()
            console.log('elseee')
            
            await axios.put(baseURL, { toBeUpdatedInUser })
            .then((response) => 
            { 
                console.log('updateddd',toBeUpdatedInUser);
                console.log('response', response.data)
                props.setUser(response.data);
                history.push('/users/search')
            }
            );
        }
    };

   
    return (
        <div style={{alignItems:'center'}}>
        <div style={{ backgroundImage: "url(/airplane-sky-flight-clouds.jpg)",backgroundSize:'100%',height:'100vh',zIndex:'0'}} className="d-flex flex-column justify-content-center align-items-center" >
            
            <Card sx={{ maxWidth: 345 }} className="mt-5 text-center m-auto w-50 mt-auto" style={{backgroundColor:"white", opacity:'0.85'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="justify-content-center p-5">
                <h1 style={{color:'black', fontWeight:'bold'}}>Update User Details</h1>
                <Row className="mb-3 ml-2">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>FirstName</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "FirstName": event.target.value }));setIsEmpty(false);}}          
                            defaultValue={user.FirstName}
                            type="text"
                            placeholder='First Name'
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>MiddleName</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "MiddleName": event.target.value }));setIsEmpty(false);}}
                            defaultValue={user.MiddleName}
                            type="text"
                            placeholder='Middle Name'
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                 
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>LastName</Form.Label>
                        <Form.Control
                            input="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "LastName": event.target.value }));setIsEmpty(false);}}
                            defaultValue={user.LastName}
                            type="text"
                            placeholder='Last Name'
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-5 mt-3" >
                    <Form.Group as={Col} md="4" controlId="validationCustom08">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>PassportNumber</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "PassportNumber": event.target.value }));setIsEmpty(false);}}
                            defaultValue={user.PassportNumber}
                            placeholder='Passport Number'
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>Email</Form.Label>
                        <Form.Control
                            input="text"
                            type="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "Email": event.target.value }));setIsEmpty(false);}}
                            defaultValue={user.Email}
                            placeholder='Email'
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom08">
                        <Form.Label style={{color:'black', fontWeight:'bold'}}>LivesIn</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={event => {setToBeUpdatedInUser(Object.assign(toBeUpdatedInUser, { "LivesIn": event.target.value }));setIsEmpty(false);}}
                            defaultValue={user.LivesIn}
                            placeholder= "Lives In"
                            
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                   
                </Row>
                <Form.Group className="mb-3 d-flex justify-content-center" >
                    <Form.Check
                        required
                        //label="Are You Sure You Want to Update this Flight"
                        feedback="You must agree before Updating."
                        feedbackType="invalid"
                    />
                    <Form.Label style={{color:'black', fontWeight:'bold'}}>
                    Are You Sure You Want to Update this User 
                    </Form.Label>
                </Form.Group>
                <Button variant="warning" type="submit" disabled={isEmpty}>Update User</Button>
            </Form>
            </Card>
            </div>
            </div>
            
  
    );
};

export default UpdateUser;