import './App.css';

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Read from './components/read';
import Update from './components/update';
import Login from './components/login';

function App() {
    return (
      <Switch>
        <Route exact path="/"  component={Login} />
        <Route path="/read"  component={Read} />
        <Route path="/update"  component={Update} />
        <Redirect to="/" />
      </Switch>
    );
}

export default App;
