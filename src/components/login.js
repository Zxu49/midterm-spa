import React from 'react';
import logo from '../logo.svg';

export default function Login() {
  const clientId = "2vp20nkl64dfa4da77ojshk7hk"
  const host = "https://givemeanicenamefor.auth.us-east-1.amazoncognito.com"
  const testUrl = host + "/login?client_id="+clientId+"&response_type=token&redirect_uri=http://localhost:3000/read"
  const hostUrl = host + "/login?client_id="+clientId+"&response_type=token&redirect_uri=https://www.givemeanicenamefor.works/read"

  return (
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> REACT CRUD SPA </p>
          <button onClick = {() => window.location.href = hostUrl } >
          <p> Login </p>
          </button>
      </header>
  )
}