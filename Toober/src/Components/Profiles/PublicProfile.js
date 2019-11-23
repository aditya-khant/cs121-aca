import React, { Component } from 'react';
import firebase from '../../FirebaseConfig.js';
import {Grid, Paper, Avatar, CircularProgress, List, ListItem, ListItemText} from "@material-ui/core"
import {isNullEmptyUndef, retrieve} from '../../Helpers.js';

import Theme from '../Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class Profile extends Component {
    constructor(props) {
    super(props);
    console.log(props);

    this.state = {
        username: props.location.query.tutorName,
        uid: props.location.query.tutorUID,
        isLoading: true,
        time: 0
    }

    }
    
    componentDidMount() {
      this.getTime();
    }

    async getTime(){
      const tutorTime = await retrieve("users", this.state.uid, "tutorTime");
      this.setState({
        time: tutorTime,
        isLoading: false
      })
    }

    render() {

      let theTime;

      theTime = `This tutor has spent a total of ${this.state.time} minutes tutoring.` ;

        var user = firebase.auth().currentUser;
        let header;

                header = (
                  <div>
                    <h1>{this.state.username}</h1>
                  </div>
                 )

        return (

        <div style={{ padding: 20}}>
        <MuiThemeProvider theme={Theme}>
        <Grid item xs={3}>
          {header}
        </Grid>
        <Grid item xs={9}>
          <h4>{theTime}</h4>
        </Grid>
        
        </MuiThemeProvider>
        </div>
        
        )
  }
}

export default Profile;
