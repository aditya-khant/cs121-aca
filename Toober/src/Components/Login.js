import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../FirebaseConfig";
import { AuthContext } from "../Auth";

const Login = ({ history }) => {
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
    <div>
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);