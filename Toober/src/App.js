import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Components/HomePage';
import Tutor from './Components/TutorPage';
import Tutee from './Components/TuteePage';
import Navigation from './Components/Navigation';
import Chat from './Components/ChatPage';

// This document sets the URLs in Route
// Referenced by Navigation.js
const App = () => {
    return (
        <BrowserRouter>
          <div>
          <Navigation />
              <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/tutor" component={Tutor}/>
              <Route path="/tutee" component={Tutee}/>
              <Route path="/chat" component={Chat}/>
            </Switch>
          </div> 
        </BrowserRouter>
    );
  }

export default App;