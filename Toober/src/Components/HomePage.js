import React from 'react';
import Button from '@material-ui/core/Button';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import app from "../FirebaseConfig";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
     <div>
     <MuiThemeProvider theme={Theme}>
        <h1>Home Page</h1>
      <Button variant="contained" color="secondary" component={Link} to="/Tutor">
        Tutor
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/Tutee">
        Tutee
      </Button>
      </MuiThemeProvider>
     </div>
  );
}
 
export default HomePage;
