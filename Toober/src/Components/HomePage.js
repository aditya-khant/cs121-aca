import React from 'react';
import Button from '@material-ui/core/Button';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
     <div>
     <MuiThemeProvider theme={Theme}>
      <Grid container spacing={3} justify="center"  direction="row" >
        <Grid item >
            <h1>Please select your role:</h1>
        </ Grid>
        </ Grid>
        
        <Grid container spacing={3} justify="center"  direction="row" >
        <Grid item>
          <Button variant="contained" size="large" color="secondary" component={Link} to="/Tutor">
            Tutor
          </Button>
        </ Grid>
        <Grid item >
          <Button variant="contained" size="large" color="secondary" component={Link} to="/Tutee">
            Tutee
          </Button>
        </ Grid>
      </ Grid>
    </MuiThemeProvider>
     </div>
  );
}
 
export default HomePage;
