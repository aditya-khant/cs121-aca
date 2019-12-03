import React, { Component } from 'react';
import firebase from '../../FirebaseConfig.js';
import {Grid, Paper, Avatar, CircularProgress, List, ListItem, ListItemText } from "@material-ui/core";
import {isNullEmptyUndef} from '../../Helpers.js';

import Theme from '../Theme.js';
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
        listOfTime: [],
        problemList: [],
        open: false
    }

    if (user != null)
        {
            this.state.username = user.displayName;
            this.state.email = user.email;
            this.state.photoUrl = user.photoURL;
        }

    this.listProblems = this.listProblems.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);


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

    handleClickOpen(){
      this.setState({
          open: true,
      })
    };

    handleClose(){
      this.setState({
          open: false,
      })
  };

    // makeContent() {
    //   <form onSubmit={this.handleSubmit} style={{ width: "500px" }} /*Change this to Form Control*/>
    //     <input type="text" name="problem" placeholder="What is your favorite subject to tutor?" onChange={this.handleChange} value={this.state.problem}/>
    //       <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
    //           <option value="Math">Math</option>
    //           <option value="Biology">Biology</option>
    //           <option value="English">English</option>
    //       </select>
    //       <Button variant="contained" type="submit" color="primary">
    //         Submit
    //       </Button>
    //     </form>
    // }

    prettifyTimeSubject(inp){
      let arr = inp.split("_");
      if (arr.length === 1){
        return "Overall Time Spent";
      } else {
        return "Time spent on " + arr[1];
      }
    }


    render() {
      const times = this.state.listOfTime;
      const problemList = this.state.problemList;
      let list;
      let theTime;
      if (this.state.isLoading){
        list = (
          <CircularProgress />
        );
        theTime = (
          <CircularProgress />
        );
      } else {
        list = (
          <List>
                {problemList.map((problem) => {
                  return (
                    <Paper>
                      <ListItem key={problem.problem}>
                        <ListItemText primary={problem.problem} secondary={problem.subject} />
                      </ListItem>
                    </Paper>
                  )})}
              </List>
        );
          theTime = (
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
          );
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
        <Grid item xs = {9}>
        </Grid>
        </MuiThemeProvider>
        </div>
        
        )
  }
}

export default Profile;
