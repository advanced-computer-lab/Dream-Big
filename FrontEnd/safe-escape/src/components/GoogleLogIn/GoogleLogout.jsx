import React from "react";
import { GoogleLogout } from 'react-google-login';

const clientID = '989878519962-v9maq3qp1rr9cm265k1ar4nvft5hcrag.apps.googleusercontent.com';

function Googlelogout() {

    const onSuccess = (res) => {
        console.log('[LogOut Success] res: ', res);
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientID}
                buttonText="LogOut"
                onLogoutSuccess={onSuccess}
                style={{ marginTop: '100px' }}
            >
            </GoogleLogout>
        </div>
    )

}

export default Googlelogout;