import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';


import Home from './Components/HomePage';
import Tutor from './Components/TutorPage';
import Tutee from './Components/TuteePage';
import Navigation from './Components/Navigation';
import Chat from './Components/Chat/ChatPage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

// This document sets the URLs in Route
// Referenced by Navigation.js

class App extends Component {

  render() {
    // Creates NavBar for navigation. Private pages only accessible through login
    return (
      <AuthProvider>
        <Router>
          <div>
          <Navigation />
              <Switch>
            />
              <PrivateRoute exact path="/chat" component={Chat}/>
              <PrivateRoute exact path="/" component={Home}/>
              <PrivateRoute exact path="/tutor" component={Tutor}/>
              <PrivateRoute exact path="/tutee" component={Tutee}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/profile" component={Profile}/>
            </Switch>
          </div> 
        </Router>
      </AuthProvider>
    );
  }
}

export default App;