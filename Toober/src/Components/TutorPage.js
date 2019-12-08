import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import { Link } from "react-router-dom";

import {Grid, Select, List, ListItem, ListItemText, Paper, Button, Badge} from '@material-ui/core';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {isNullEmptyUndef} from '../Helpers.js';
import {Subjects, createSelectItems} from './Subjects.js'


class Tutor extends Component {
    constructor(props) {
        super(props);
        // We will populate this list with data from Firebase
        this.state = {
          problems: [],
          subject: Subjects[0],
          email: firebase.auth().currentUser.email,
          uid: firebase.auth().currentUser.uid,
          tutorName: firebase.auth().currentUser.displayName
        }
        this.handleChange = this.handleChange.bind(this);
        this.pickSubject = this.pickSubject.bind(this);
    }

   
componentDidMount() {
    // Loading data from Firebase
    this.listProblems()
}

async listProblems(){
    // Loading data from Firebase
    const existingChats = await this.listChats();
    const problemRef = firebase.database().ref('problems');

    problemRef.on('value', (snapshot) => {
        let problems = snapshot.val();
        let newState = [];
        
        // Loops over the data we get from Firebase and populates state
        // So that the Tutor can see it
        for (let id in problems) {
            let active = false;
            if (existingChats.includes(id)){
                active = true;
            }
            newState.push({
                username: problems[id].user,
                problem: problems[id].problem,
                subject: problems[id].subject,
                uid: problems[id].uid,
                id: id,
                active: active,
                name: problems[id].name
            });
        }
        this.setState({
            problems: newState
        });
    });
}

async listChats(){
    // Loading existing data from Firebase
    const chatRef = firebase.database().ref("chat");
    let existingChats = []
    const snapshot = await chatRef.orderByChild("tutorUID").equalTo(this.state.uid).once('value')
    const chat_dict = snapshot.val();
    if (!isNullEmptyUndef(chat_dict)){
        for (const [, value] of Object.entries(chat_dict)) {
            const problemID = value.problem;
            existingChats.push(problemID);
        }
    };
    return existingChats;
}

handleChange(e) {
    // Update the state when necessary
    this.setState({
      [e.target.name]: e.target.value
    });
  };

pickSubject(problem, subject) {
    // Takes in a problem array with username, problem, subject, and id
    // and the subject the tutor wants to see from the dropdown
    // and returns the problems that match that subject
    if (problem.subject === subject) {
        return (
                <Paper key={problem.id}>
                    
                        <ListItem key={problem.id}>
                        <ListItemText primary={problem.problem} secondary={problem.name} />
                        <Link  style={{ textDecoration: 'none' }} to= {{ pathname: '/Chat', 
                        query: {
                            problemID: problem.id,
                            user: this.state.email,
                            tuteeName: {isTutor: true, chattingWith: problem.name},
                            tuteeUID: problem.uid,
                            tutorUID: firebase.auth().currentUser.uid,
                            name: problem.name}}}>
                            <Badge invisible={!problem.active} badgeContent= " " color="primary">
                                <Button variant="contained" color="secondary">Go to chat!</Button>
                            </Badge>
                        </Link>
                            
                        </ListItem>
                   
                </Paper>
            
            
        )} 
        return null
}
 
render(){
    return (
        <div style={{ padding: 20}}>
            <MuiThemeProvider theme={Theme}>
                <h1>Tutor</h1>
                <h3>Pick a Subject</h3>
                <Grid container spacing={3} justify="flex-start"  direction="row" >
                    <Grid item>
                        <Select
                            value={this.state.subject}
                            onChange={this.handleChange}
                            name = {"subject"}
                            autoWidth = {true}
                            >
                            {createSelectItems("menuItem")}
                        </Select>
                    </ Grid>
                </ Grid>
                <List>
                {this.state.problems.map((problem) => {
                    return this.pickSubject(problem, this.state.subject)
                })}
                </List>
            </MuiThemeProvider>
        </div>
     );
 }
}
 
export default Tutor;