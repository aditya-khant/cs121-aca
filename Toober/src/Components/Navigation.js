import React, { useContext } from "react";
import {Button, Toolbar, Typography, AppBar} from "@material-ui/core";
import { Link } from "react-router-dom";

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { AuthContext } from "../Auth";
import app from "../FirebaseConfig";

import {Home, School, LockOpen, Lock, AccountCircle} from '@material-ui/icons';
import {Teach} from 'mdi-material-ui';

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
                 <Button startIcon={<Home />} color="secondary" size="large" component={Link} to="/" underline="none" >Home</Button>
                  <Button startIcon={<Teach />} color ="secondary" size="large" underline="none" component={Link} to="/Tutor" >Tutor</Button>
                  <Button startIcon={<School />} color ="secondary" size="large" underline="none" component={Link} to="/Tutee" >Tutee</Button>
                   <Button startIcon={<Lock />} color ="secondary" size="large" underline="none" onClick={() => app.auth().signOut()}>Logout</Button>
                   <Button startIcon={<AccountCircle />} color="secondary" component={Link} to="/MyProfile">{"Welcome "+ app.auth().currentUser.email} </Button>     
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
               <Button startIcon={<Home />} size="large" component={Link} to="/" underline="none" >Home</Button>
                <Button startIcon={<Teach />} color ="inherit" size="large" underline="none" component={Link} to="/Tutor" >Tutor</Button>
                <Button startIcon={<School />} color ="inherit" size="large" underline="none" component={Link} to="/Tutee" >Tutee</Button>
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