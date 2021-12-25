import React from "react";
import axios from "axios";

import { GoogleLogin } from 'react-google-login';

const clientID = '989878519962-v9maq3qp1rr9cm265k1ar4nvft5hcrag.apps.googleusercontent.com';

function Googlelogin() {

    const baseUrl = `http://localhost:8000/users/google/login`

    const handleLogin = async googleData => {

        axios.post(baseUrl, {
                token: googleData.tokenId
        }).then((res) => {
            console.log(res, "res");
        })
    }
    
    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy="single_host_origin"
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            >
            </GoogleLogin>
        </div>
    )

}

export default Googlelogin;