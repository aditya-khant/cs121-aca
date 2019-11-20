import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import {Grid, Paper, Avatar, CircularProgress, List, ListItem, ListItemText} from "@material-ui/core"
import {isNullEmptyUndef, retrieve, retrieveMultiple} from '../Helpers.js';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class Profile extends Component {
    constructor() {
    super();

    var user = firebase.auth().currentUser;

    this.state = {
        username: "",
        email: "",
        photoURL: "",
        uid: firebase.auth().currentUser.uid,
        isLoading: true,
        time: 0,
        problemList: []
    }

    if (user != null)
        {
            this.state.username = user.displayName;
            this.state.email = user.email;
            this.state.photoUrl = user.photoURL;
        }

    this.listProblems = this.listProblems.bind(this);
    }
    
    componentDidMount() {
      this.listProblems();
      this.getTime();
    }

    listProblems() {
      const problemRef = firebase.database().ref("problems");      
      let newProblems = [];
      problemRef.orderByChild("uid").equalTo(this.state.uid).on('value', async (snapshot) => {
        const problem_dict = snapshot.val();
        if (!isNullEmptyUndef(problem_dict)){
          for (const [, value] of Object.entries(problem_dict)) {
            const problem = value.problem;
            const subject = value.subject;
            newProblems.push({problem: problem, subject: subject});
          }
          
        } 
        this.setState({
          problemList: newProblems,
          isLoading: false
        });
      });
    }

    async getTime(){
      const tutorTime = await retrieve("users", this.state.uid, "tutorTime");
      this.setState({
        time: tutorTime,
        isLoading: false
      })
    }

    render() {
      const problemList = this.state.problemList;
      let list;
      let theTime;
      if (this.state.isLoading){
        list = (
          <CircularProgress />
        );
      } else {
        list = (
          <List>
                {problemList.map((problem) => {
                  return (
                    <Paper>
                      <ListItem>
                        <ListItemText primary={problem.problem} secondary={problem.subject} />
                      </ListItem>
                    </Paper>
                  )})}
              </List>
        );
      theTime = `You have spent a total of ${this.state.time} minutes tutoring.` ;
      }
        var user = firebase.auth().currentUser;
        let header;
        if (user != null) {
            const userName = user.displayName;
            const imageURL = user.photoURL;
            if (imageURL !== ""){
                header = (
                  <div>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Grid item xs={5}>
                        <Avatar src={imageURL} alt ={userName} style={{ width: 100, height: 100, margin: 10}}/>
                      </Grid>
                      <Grid item xs={7}>
                        <h1>{userName}</h1>
                      </Grid>
                    </Grid>  
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

        <div style={{ padding: 20}}>
        <MuiThemeProvider theme={Theme}>
        <Grid item xs={3}>
          {header}
        </Grid>
        <Grid item xs={9}>
          <h3>My Tutor Time</h3>
          <h4>{theTime}</h4>
        </Grid>
        <Grid item xs={9}>
          <h3>My Current Problems</h3>
          {list}
        </Grid>
        
        </MuiThemeProvider>
        </div>
        
        )
  }
}

export default Profile;
