import React from 'react';
import logo from '../logo.svg';

export default function Login() {
    return (
        <div>
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                REACT CRUD SPA
            </p>
            <button 
                onClick = {() => window.location.href = "https://www.givemeanicenamefor.auth.us-east-1.amazoncognito.com/login?client_id=2vp20nkl64dfa4da77ojshk7hk&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://www.givemeanicenamefor.works/read"
                }
            >
            <p>  Login </p>
            </button>
            </header>
        </div>
    )
}