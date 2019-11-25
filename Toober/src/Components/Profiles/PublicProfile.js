import React, { Component } from 'react';
import firebase from '../../FirebaseConfig.js';
import {Grid, Paper, Avatar, CircularProgress, List, ListItem, ListItemText} from "@material-ui/core"
import {isNullEmptyUndef, retrieve} from '../../Helpers.js';

import Theme from '../Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class Profile extends Component {
    constructor(props) {
    super(props);

    this.state = {
        username: props.location.query.tutorName,
        uid: props.location.query.tutorUID,
        listOfTime: [],
        isLoading: true
      }

    }
    
    componentDidMount() {
      this.getTime();
    }

    async getTime(){
      const userRef = firebase.database().ref("users/" + this.state.uid);
      let times = []
      userRef.once("value").then(function(snapshot) {
        let data = snapshot.val();

        for (let id in data) {
          times.push({
            id: id,
            time: data[id]
          })
        }
      })
      this.setState({
        listOfTime: times,
        isLoading:false
      })
    }

    render() {
      let times = this.state.listOfTime;
      let list;
      if (this.state.isLoading){
        list = (
          <CircularProgress />
        );
      }else {
      list =  (
          <List>
            {times.map((content) => {
              return(
                <p>{content.time}</p>
              )
            })}
            </List>
        )
      }
      // theTime = `This tutor has spent a total of ${this.state.time} minutes tutoring.` ;
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
          <h4>{list}</h4>
        </Grid>
        
        </MuiThemeProvider>
        </div>
        
        )
  }
}

export default Profile;
