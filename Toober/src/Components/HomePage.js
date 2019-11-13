import React from 'react';
import Button from '@material-ui/core/Button';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';


const HomePage = () => {
  return (
     <div>
     <MuiThemeProvider theme={Theme}>
      <div>
      <Grid container justify="center"  direction="row" >
        <Grid item >
            <h1>Please select your role:</h1>
        </ Grid>
        </ Grid>
    <FancyHomeButtons />
      </div>
    </MuiThemeProvider>
     </div>
  );
}
 
export default HomePage;
