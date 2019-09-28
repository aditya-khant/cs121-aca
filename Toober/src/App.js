import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Components/HomePage';
import Tutor from './Components/TutorPage';
import Tutee from './Components/TuteePage';
import Navigation from './Components/Navigation';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
          <Navigation />
              <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/tutor" component={Tutor}/>
              <Route path="/tutee" component={Tutee}/>
            </Switch>
          </div> 
        </BrowserRouter>
    );
  }
}
 
export default App;