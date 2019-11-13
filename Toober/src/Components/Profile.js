import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import {Grid} from "@material-ui/core"


class Profile extends Component {
    constructor() {
    super();

    var user = firebase.auth().currentUser;

    this.state = {
        username: "",
        email: "",
        photoURL: ""
    }

    if (user != null)
        {
            this.state.username = user.displayName;
            this.state.email = user.email;
            this.state.photoUrl = user.photoURL;
        }
    }   

    render() {
        var user = firebase.auth().currentUser;
        let header;
        if (user != null) {
            const userName = user.displayName;
            const imageURL = user.photoURL;
            if (imageURL !== ""){
                header = (
                  <div>
                    <h1>{userName}</h1>
                    <img src={imageURL} alt = "the user" width="100%" />
                  </div>
                )
              } else {
                header = (
                  <div>
                    <h1>{userName}</h1>
                  </div>
                )
              }
        }
        return (
        <div>
            <Grid item xs={3}>
          {header}
        </Grid></div>
        )
}
}

export default Profile;
