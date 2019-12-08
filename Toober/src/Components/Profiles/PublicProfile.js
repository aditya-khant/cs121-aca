import React, { Component } from 'react';
import firebase from '../../FirebaseConfig.js';
import {Grid, Paper, CircularProgress, List, ListItem, ListItemText} from "@material-ui/core"

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
      this.setState({
        isLoading:true, 
      })
      
      const userRef = firebase.database().ref("users/" + this.state.uid);
      let times = []
      let snapshot = await userRef.once("value");
      let data = snapshot.val();
      for (let id in data) {
        times.push({
          id: id,
          time: data[id]
        })
      }
      
      this.setState({
        listOfTime: times,
        isLoading:false
      })
    }

    prettifyTimeSubject(inp){
      let arr = inp.split("_");
      if (arr.length === 1){
        return "Overall Time Spent";
      } else {
        return "Time spent on " + arr[1];
      }
    }

    render() {
      let times = this.state.listOfTime;
      let list;
      if (this.state.isLoading) {
        list = (
          <CircularProgress />
        );
      } else {
      list =  (
          <List>
            {times.map((content) => {
              return(
                <Paper>
                    <ListItem key={content.id}>
                      <ListItemText primary={this.prettifyTimeSubject(content.id)} secondary={content.time + " Minutes"} />
                    </ ListItem>
                </ Paper>
              )
            })}
            </List>
        )
      }
      
      return (
        <div style={{ padding: 20}}>
        <MuiThemeProvider theme={Theme}>
        <Grid item xs={3}>
        <h1>{this.state.username}</h1>
        </Grid>
        <Grid item xs={9}>
          {list}
        </Grid>
        
        </MuiThemeProvider>
        </div>
        
        )
  }
}

export default Profile;
