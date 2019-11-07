import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../FirebaseConfig";
import { AuthContext } from "../Auth";
import {Grid, TextField, Button} from '@material-ui/core';
import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const Login = ({ history }) => {

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };
  
  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      // Wait until user puts in info
      await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      // Goes to main page after successful login
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const { currentUser } = useContext(AuthContext);
 
  if (currentUser) {
    // If the user is logged in already, make sure they can't access login page
    return <Redirect to="/" />;
  }

  return (
    <div style={{ padding: 20}}>
      <MuiThemeProvider theme={Theme}>
      <Grid container direction = "row">
        <Grid item>
        <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <Button variant="contained" color="primary" type="submit">Log in</Button>
      </form>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    </div>
  );
};

export default withRouter(Login);