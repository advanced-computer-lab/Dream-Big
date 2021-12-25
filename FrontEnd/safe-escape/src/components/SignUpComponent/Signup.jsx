import axios from "axios";
import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import { useHistory } from "react-router-dom";
import validator from 'validator'
import { useEffect } from "react";
//import showPassword from '../assets/visibility.png'
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


const Signup = () => {

  const baseURL = 'http://localhost:8000/users/signup';

  const [formLayout, setFormLayout] = useState('horizontal');
  const [missingInputs,setMissingInputs]=useState(true);
  const [warningMessage,setWarningMessage]=useState(false);
  const [missingFirstName,setMissingFirstName]=useState(true);
  const [missingEmail,setMissingEmail]=useState(true);
  const [missingMiddle,setMissingMiddle]=useState(true);
  const [missingLast,setMissingLast]=useState(true);
  const [missingPass,setMissingPass]=useState(true);
  const [missingPhone,setMissingPhone]=useState(true);
  const [missingAge,setMissingAge]=useState(true);
  const [missingPassword,setMissingPassword]=useState(true);
  const [user,setUser]=useState({});
  const [missingUserName,setMissingUserName]=useState(true);
  const [missingCountry,setMissingCountry]= useState(true);
  const [clear,setClear]=useState(false);
  const [showPass,setShowPass]= useState(false);
  const history = useHistory();
  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  }
  const [errorMessage, setErrorMessage] = useState('')
  const [isStrongPassword, setIsStrongPassword]=useState('false');
  const validate = (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password');
      setIsStrongPassword(true);
    } else {
      setErrorMessage('Not A Strong Password');
      setIsStrongPassword(false);
    }
  }
 
      const [form] = Form.useForm();
      const [requiredMark, setRequiredMarkType] = useState('required');
    
      const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
      }; 


      const togglePassword = () => {
        setShowPass(!showPass);
      };

      const checkMissing=()=>{
        (missingPassword || missingEmail || missingFirstName || missingMiddle || missingLast || missingAge || missingPass || missingPhone) ? 
         setWarningMessage(true) : setWarningMessage(false);
      };

      const handleSubmit=()=>{
        //alert("Hellooo");
//if(missingEmail === false && missingFirstName === false && missingMiddle === false && missingLast === false && missingPass === false && missingUserName===false && missingPassword === false && missingPhone === false && setMissingAge === false) 
         
            // if(isStrongPassword)
            // {

            if(missingPassword || missingEmail || missingFirstName || missingMiddle || missingLast || missingAge || missingPass || missingPhone) {
              console.log('IFFFFFFFF')
              setWarningMessage(true)
            }
            else{
              console.log('ELSEEEEEEEE')
              setWarningMessage(false);
              axios.post(baseURL, user).then(res => {
                console.log(res.data)
                setClear(true);
                alert("You Registered Successfully");
                history.push('/login');
              });
            }
          // }
          //    else
          //         alert("Use a stronger password");
          
      };
  return (
           <Card style={{opacity: '0.85', width: '35vw', marginTop:'230px'}}>
            <div style={{ alignItems: 'center'}}>
                        <div style={{ textAlign: 'center'}}>
                            <h1>Sign Up</h1>
                        </div>

                      <Form
                        form={form}
                        layout="horizontal"
                        initialValues={{
                          requiredMarkValue: requiredMark,
                        }}
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={requiredMark}
                      >
                         
                  
                        <div style={{display:'flex',justifyContent:'spaceBetween', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                              <Form.Item label="First Name" required tooltip="This is a required field" style={{display:'flex', flexDirection:'column'}}>
                                    <Input placeholder="Engy" onChange={(e)=>{setMissingFirstName(false); setUser({ ...user, "FirstName": e.target.value });if(clear){e.target.value=""};}} />
                                    {warningMessage && missingFirstName?
                                      <div> <span style={{color:'red'}}>This is required</span></div>
                                        :''}
                              </Form.Item>

                              </div>
                              <div style={{display:'flex', flexDirection:'column'}}>
                                  <Form.Item label="Middle Name" required tooltip="This is a required field" style={{display:'flex', flexDirection:'column'}}>
                                    <Input placeholder="Khaled" onChange={(e)=>{setMissingMiddle(false);setUser({ ...user, "MiddleName": e.target.value });if(clear){e.target.value=""};}} />
                                    {warningMessage && missingMiddle?
                                      <div> <span style={{color:'red'}}>This is required</span></div>
                                        :''}
                                  </Form.Item>
                              </div>
                              <div style={{display:'flex', flexDirection:'column'}}>
                                  <Form.Item label="Last Name" required tooltip="This is a required field" style={{display:'flex', flexDirection:'column'}}>
                                      <Input placeholder="EzzElarab" onChange={(e)=>{setMissingLast(false);setUser({ ...user, "LastName": e.target.value });if(clear){e.target.value=""};}} />
                                      {warningMessage && missingLast?
                                        <div> <span style={{color:'red'}}>This is required</span></div>
                                          :''}
                                    </Form.Item>
                              </div>

                        </div>
                        <div style={{display:'flex',justifyContent:'spaceBetween', width:'100%'}}>
                         <div>
                          <Form.Item label="Username" required tooltip="This is a required field" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                              <Input placeholder="engy.elarab" onChange={(e)=>{setMissingUserName(false);setUser({ ...user, "username": e.target.value });if(clear){e.target.value=""};}} />
                              {warningMessage && missingUserName?
                                <div> <span style={{color:'red'}}>This is required</span></div>
                                  :''}
                            </Form.Item>
                            </div>
                            <div>
                            <Form.Item label="Password" required tooltip="This is a required field" style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'space-between'}}>
                            <div style={{display:'flex', height:'5.5vh'}}>
                              <Input placeholder="asbcFG_1" type={showPass?"text":"password"} onChange={(e)=>{setMissingPassword(false);validate(e.target.value);setUser({ ...user, "Password": e.target.value });if(clear){e.target.value=""};}} />
                             
                            {showPass?
                            <button onClick={togglePassword}>Hide</button>
                            :
                            <button onClick={togglePassword}>Show</button>
                            }

                              </div>
                              {!missingPassword?
                               <span style={{
                                fontWeight: 'normal',
                                color: 'red',
                              }}>{errorMessage}</span>
                              :''}
                             
                              {warningMessage && missingPassword?
                                <div> <span style={{color:'red'}}>This is required</span></div>
                                  :''}
                                   {/* <i className="far fa-eye" id="togglePassword"></i> */}

                            </Form.Item>
                            {/* <span> <i class="fas fa-eye"></i> </span> */}
                            </div>
                       </div>
                              <Form.Item label=" Age" required tooltip="This is a required field">
                                <Input placeholder="23" onChange={(e)=>{setMissingAge(false);setUser({ ...user, "Age": e.target.value });if(clear){e.target.value=""};}} />
                                {warningMessage && missingAge?
                                  <div> <span style={{color:'red'}}>This is required</span></div>
                                    :''}
                              </Form.Item>
                     


                  
                              <Form.Item label="E-mail" required tooltip="This is a required field"
                              >
                                <Input placeholder="example@gmail.com" onChange={(e)=>{setMissingEmail(false);setUser({ ...user, "Email": e.target.value });if(clear){e.target.value=""};}} />
                                {warningMessage && missingEmail?
                                  <div> <span style={{color:'red'}}>This is required</span></div>
                                    :''}
                              </Form.Item>

                              <Form.Item label="Country" required tooltip="This is a required field">
                                <Input placeholder="e.g Egypt" onChange={(e)=>{setMissingCountry(false);setUser({ ...user, "LivesIn": e.target.value });if(clear){e.target.value=""};}} />
                                {warningMessage && missingCountry?
                                  <div> <span style={{color:'red'}}>This is required</span></div>
                                    :''}
                              </Form.Item>

                        <Form.Item label="Phone Number" required tooltip="This is a required field">
                          <Input placeholder="123456789" onChange={(e)=>{setMissingPhone(false);setUser({ ...user, "PhoneNumber": e.target.value });if(clear){e.target.value=""};}} />
                          {warningMessage && missingPhone?
                            <div> <span style={{color:'red'}}>This is required</span></div>
                               :''}
                        </Form.Item>
                        <Form.Item label="Passport Number" required tooltip="This is a required field">
                          <Input placeholder="A51234678" onChange={(e)=>{setMissingPass(false);setUser({ ...user, "PassportNumber": e.target.value });if(clear){e.target.value=""};}} />
                          {warningMessage && missingPass?
                            <div> <span style={{color:'red'}}>This is required</span></div>
                               :''}
                        </Form.Item>
                       
                        
                        <Form.Item >
                          <div style={{display:'flex' , justifyContent:'between',alignItems:'center',width:'100%'}}>
                          {/* checkMissing(); */}
                          <Form.Item style={{marginRight:'3vw',marginTop:'3vh'}}>
                                 Already have an account? <a onClick={(e)=>{routeChange()}} style={{color:'blue'}}>Sign in</a>
                          </Form.Item>
                          <Button type="primary" onClick={handleSubmit}>Submit</Button>
                          {/* isStrongPassword? handleSubmit() : alert("Use Stronger Password");checkMissing(); */}
                           </div>
                        </Form.Item>
                       
                      </Form>


              
               </div>
               </Card>
        );
}

export default Signup;