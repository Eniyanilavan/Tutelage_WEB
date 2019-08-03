import React, { Component } from 'react';
import Login from './components/Login';
import Editor from './components/Editor';
import UploadQuestions from './components/UploadQuestions';
import Dashborad from './components/Dashboard';
import Card from './components/Card';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    console.log('in App');
    return (
      <Router>
        <Switch>
          <Route path="/editor" component={Editor}/>
          <Route path="/upload" component={UploadQuestions}/>
          <Route path="/dashboard" component={Dashborad}/>
          <Route path="/card" component={Card}/>
          <Route path="/" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
