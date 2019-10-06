import React from 'react';
import Button from '@material-ui/core/Button';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const HomePage = () => {
  return (
     <div>
     <MuiThemeProvider theme={Theme}>
        <h1>Home Page</h1>
      <Button variant="contained" color="secondary" href="/Tutor" >
        Tutor
      </Button>
      <Button variant="contained" color="secondary" href="/Tutee">
        Tutee
      </Button>
      </MuiThemeProvider>
     </div>
  );
}
 
export default HomePage;
