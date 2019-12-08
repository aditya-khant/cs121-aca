import React, { useContext } from "react";
import {Button, Toolbar, Typography, AppBar, Avatar} from "@material-ui/core";
import { Link } from "react-router-dom";

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { AuthContext } from "../Auth";
import app from "../FirebaseConfig";

import {School, LockOpen, Lock} from '@material-ui/icons';
import {Teach} from 'mdi-material-ui';

import logo from '../img/tooberlogo.png';

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    
    if(currentUser)
    {
      return (
        <div>
         <MuiThemeProvider theme={Theme}>
           <AppBar position="static" color = 'primary' /*Material UI navigation bar look*/>
              <Toolbar>
                 <Typography  color = 'secondary'>
                 
                  <Button color="secondary"  component={Link} to="/" underline="none" style={{width: "10%" }}><img src={logo} alt="Logo" style={{width: "100%" }}  /></Button>
                  <Button startIcon={<Teach />} color ="secondary" size="large" underline="none" component={Link} to="/Tutor" >Tutor</Button>
                  <Button startIcon={<School />} color ="secondary" size="large" underline="none" component={Link} to="/Tutee" >Tutee</Button>
                   <Button startIcon={<Lock />} color ="secondary" size="large" underline="none" onClick={() => app.auth().signOut()}>Logout</Button>
                   <Button color="secondary" component={Link} to="/MyProfile"><Avatar alt="Profile" src={ app.auth().currentUser.photoURL} />{"Welcome "+ app.auth().currentUser.displayName} </Button>     
                 </Typography>
                
              </Toolbar>
            </AppBar>
           </MuiThemeProvider>
         </div>
        )
    }
    else
    {
      return (
      <div>
       <MuiThemeProvider theme={Theme}>
         <AppBar position="static" color = 'primary' /*Material UI navigation bar look*/>
            <Toolbar>
               <Typography>
                <Button color="secondary"  component={Link} to="/" underline="none" style={{width: "10%" }}><img src={logo} alt="Logo" style={{width: "100%" }}  /></Button>
                <Button startIcon={<LockOpen />}color ="inherit" size="large" underline="none" component={Link} to="/Login">Login</Button>
               </Typography>
            </Toolbar>
          </AppBar>
         </MuiThemeProvider>
       </div>
      )
    }

}
 
export default Navigation;