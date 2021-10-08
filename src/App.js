import './App.css';

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Read from './components/read';
import Update from './components/update';
import Login from './components/login';

function App() {
    return (
      <Switch>
        <Route exact path="/login"  component={Login} />
        <Route exact path="/read"  component={Read} />
        <Route exact path="/update"  component={Update} />
      </Switch>
    );
}

export default App;
