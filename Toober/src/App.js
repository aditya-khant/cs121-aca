import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Components/HomePage';
import Tutor from './Components/TutorPage';
import Tutee from './Components/TuteePage';
import Navigation from './Components/Navigation';

/*components required to use material-ui*/
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

/*default material-ui theme generation*/
const theme=createMuiTheme()


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/> 
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
      </MuiThemeProvider>
    );
  }
}
 
export default App;