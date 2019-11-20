import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import {Grid, Paper, CircularProgress, List, ListItem, ListItemText, Tab, AppBar} from "@material-ui/core"
import {isNullEmptyUndef, retrieve} from '../Helpers.js';

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
      const chatRef = firebase.database().ref("chat");
      
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
        theTime = this.state.time;
      }
        var user = firebase.auth().currentUser;
        let header;
        if (user != null) {
            const userName = user.displayName;
            const imageURL = user.photoURL;
            if (imageURL !== ""){
                header = (
                  <div>
                    <h1>{userName}</h1>
                    <img src={imageURL} alt = "the user" width="50%" />
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
        </Grid>

        <Grid item xs={9}>
          <h3>My Current Problems</h3>
          {list}
        </Grid>
        <Grid item xs={9}>
          <h3>My Tutor Time</h3>
          <p>{theTime}</p>
        </Grid>
        </div>
        )
  }
}

export default Profile;
