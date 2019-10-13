import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../FirebaseConfig";
import { AuthContext } from "../Auth";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    // Wait until the user has created an account
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      addToUser(event);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  // Users already logged in shouldn't be able to sign in again
  const { currentUser } = useContext(AuthContext);
  if (currentUser)
  {
    return <Redirect to="/" />;
  };

  const addToUser = ({e}) => {
    // Either initializes a problems collection in Firebase
    // Or sends it to the existing one
    const itemsRef = app.database().ref('/users/');
    
    // Sets up the submission item
    const item = {
      uid: app.auth().currentUser.uid
    }
    // If it cannot push to Firebase, we return an error
    itemsRef.push(item).catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
  };


  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);