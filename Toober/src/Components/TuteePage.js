import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import { Link } from "react-router-dom";
import {List, ListItem, ListItemText, Button, Grid} from '@material-ui/core';
import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class Tutee extends Component {
    constructor() {
        super();
        // The user inputs these items
        // This is the data sent to the database
        this.state = {
          username: '',
          problem: '',
          subject: 'Math', 
          uid: firebase.auth().currentUser.uid,
          tutoruid: "",
          email: firebase.auth().currentUser.email,
          chatList:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
        this.listChats = this.listChats.bind(this);


      }
    
  handleChange(e) {
    // Update the state when necessary
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    // Either initializes a problems collection in Firebase
    // Or sends it to the existing one
    const itemsRef = firebase.database().ref('/problems/');

    // Sets up the submission item
    const item = {
      user: this.state.email,
      problem: this.state.problem,
      subject: this.state.subject, 
      uid: this.state.uid
    }
    // If it cannot push to Firebase, we return an error
    itemsRef.push(item).catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
    // Set state back to empty
    this.setState({
      username: '',
      problem: '',
      subject: 'Math',
      uid: firebase.auth().currentUser.uid
    })
  }

  componentDidMount() {
    this.addUser();
    this.listChats();
    
  }

  addUser() {
    // Bug: With 3 users, it connects people with the wrong peron.
    //      It connects them if their IDs are not the same, not if the collection exists
    // Loading data from Firebase
    const userRef = firebase.database().ref('users');
    userRef.on('value', (snapshot) => {
        let userList = snapshot.val();
        var tutoruid = "";
        // Loops over user UIDs and checks if there is a collection
        // with the tutee UID as the second part of the collection name
        for (let user in userList) {
            if (snapshot.child((userList[user].uid.concat(firebase.auth().currentUser.uid))).exists) {
              if (userList[user].uid !== firebase.auth().currentUser.uid) {
                // If there is, make the tutorUID what was found
                tutoruid = userList[user].uid;
                break;
              }
            }
        }
        this.setState ({tutoruid : tutoruid}) ;
    });
}

listChats(){
  const chatRef = firebase.database().ref("chat");
  let newChats = []
  chatRef.orderByChild("tuteeUID").equalTo(this.state.uid).on('value', (snapshot) => {
    const chat_dict = snapshot.val();
    
    for (const [, value] of Object.entries(chat_dict)) {
      const problemID = value.problem
      const tutorUID = value.tutorUID
      const problemRef = firebase.database().ref('problems/'+problemID);
      problemRef.on('value',(snapshot2) => { 
        const snapVal = snapshot2.val(); 
        newChats.push({problem: snapVal.problem, subject: snapVal.subject, problemID:problemID, tutorUID: tutorUID});
      });
    }
    
  });

  if (newChats != []){
    this.setState({
      chatList: newChats
    });
  } else {
    console.log("0 New")
  }


}
    
  render() {

    const chatList = this.state.chatList;
    console.log(chatList);
   
    return (
      <div style={{ padding: 20}}>
        <MuiThemeProvider theme={Theme}>
        <Grid container direction = "row">
          <Grid item>
            <h1>Tutee: Welcome {this.state.email},</h1>
              <form onSubmit={this.handleSubmit} /*Change this to Form Control*/>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
                <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
                <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                    <option value="Math">Math</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                </select>
                <Button variant="contained" color="primary" type="submit">Add Question</Button>
              </form>
          </Grid>
        </Grid>
            <List>
              {chatList.map((problem) => {
                return (
                  <ListItem>
                    <ListItemText primary={problem.problem} secondary={problem.subject} />
                    <Link to= {{ pathname: '/Chat', query: {user: this.state.email, tuteeName: this.state.email, tuteeUID: this.state.uid, tutorUID: problem.tutorUID,  problemID: problem.problemID}}}>
                    <Button variant="contained" color="secondary">
                      Chat!
                    </Button>
                  </Link>
                  </ListItem>

                )})}
            </List>
          </MuiThemeProvider>
        </div>
      );
    }
}
 
export default Tutee;