import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";
import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";

const Login = ({ history }) => {

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };
  
  const { currentUser } = useContext(AuthContext);
 
  if (currentUser) {
    // If the user is logged in already, make sure they can't access login page
    return <Redirect to="/" />;
  }

  return (
    <div>
    <div style={{textAlign: "center"}}>
      <h1>Welcome to Toober!</h1>
      <p><i>Toober is designed to connect people who need homework help to those that can offer it</i></p>
    </div>
    <div style={{ padding: 20}}>
      <MuiThemeProvider theme={Theme}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </MuiThemeProvider>
    </div>
    </div>
  );
};

export default withRouter(Login);