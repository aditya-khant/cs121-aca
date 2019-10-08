import React, { useCallback, useContext } from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { AuthContext } from "../Auth";
import app from "../FirebaseConfig";

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    if(currentUser)
    {
      var login = "/Login";
      var loginText = "Logout";
    }
    else
    {
      var login = "/Login";
      var loginText = "Login";
    }
    return (
      <div>
       <MuiThemeProvider theme={Theme}>
         <AppBar position="static" color = 'primary' /*Material UI navigation bar look*/>
            <Toolbar>
               <Typography  color = 'secondary'>
                  <Tab label="Home" component={Link} to="/" /*Link and to are how we integrate with react-router*//>
                  <Tab label="Tutor" component={Link} to="/Tutor" /*We set up the "to" suffix in App.js*//>
                  <Tab label="Tutee" component={Link} to="/Tutee" />
                  <Tab label={loginText} component={Link} to={login} />
                  <Tab label="Sign Up" component={Link} to="/Signup" />
                  <button onClick={() => app.auth().signOut()}>Sign out</button>
               </Typography>
            </Toolbar>
          </AppBar>
         </MuiThemeProvider>
       </div>
    );
}
 
export default Navigation;