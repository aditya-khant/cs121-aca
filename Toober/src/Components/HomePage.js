import React from 'react';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';


const HomePage = () => {
  return (
     <div>
     <MuiThemeProvider theme={Theme}>
      <div>
      <Grid container spacing={3} justify="center"  direction="row" >
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
