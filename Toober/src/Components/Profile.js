import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';

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
        return (
        <div>Hello</div>
        )
    }
}

export default Profile;
