import logo from './logo.svg';
import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="main">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          REACT CRUD SPA
        </p>
        < button
          className="App-link"
          onClick = {() => window.location.href = "https://givemeanicenamefor.auth.us-east-1.amazoncognito.com/login?client_id=2vp20nkl64dfa4da77ojshk7hk&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://www.givemeanicenamefor.works/read"
          } 
        >
          Login
        </button>
        <Switch>
          <Route path="/create" component={Create} />
          <Route path="/read" component={Read} />
          <Route path="/update" component={Update} />
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
