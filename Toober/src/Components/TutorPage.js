import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Tutor extends Component {
    constructor(props) {
        super(props);
        // We will populate this list with data from Firebase
        this.state = {
          problems: [],
          subject: 'Math',
          email: firebase.auth().currentUser.email
        }
        this.handleChange = this.handleChange.bind(this);
    }

componentDidMount() {
    // Loading data from Firebase
    const problemRef = firebase.database().ref('problems');

    problemRef.on('value', (snapshot) => {
        let problems = snapshot.val();
        let newState = [];
        
        // Loops over the data we get from Firebase and populates state
        // So that the Tutor can see it
        for (let id in problems) {
            newState.push({
                username: problems[id].user,
                problem: problems[id].problem,
                subject: problems[id].subject,
                uid: problems[id].uid,
                id: id
            });
        }
        this.setState({
            problems: newState
        });
    });
}

handleChange(e) {
    // Update the state when necessary
    console.log(e.target.name)
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
            <div key={problem.id}>
                <div>
                    <div>
                        <h2>{problem.problem}</h2>
                        <p>{problem.username}</p>
                        <p>{problem.id}</p>
                        
                        <Link to= {{ pathname: '/Chat', query: {problemsId: problem.id, user: this.state.email, tuteeName: problem.username, tuteeUID: problem.uid, tutorUID: firebase.auth().currentUser.uid}}}>
                        <button>Go to chat!</button>
                        </Link>
                    </div>
                </div>
            </div>
        )} 
        return null
}
 
render(){
    return (
        <div>
            <Grid container justify="flex-start"  direction="row" >
                <Grid item>
                    <h1>Tutor</h1>
                </ Grid>
            </ Grid>
            <Grid container spacing={3} justify="flex-start"  direction="row" >
                <Grid item>
                    <h2>Pick a Subject</h2>
                </ Grid>
            </ Grid>
            <Grid container spacing={3} justify="flex-start"  direction="row" >
                <Grid item>
                    <Select
                        value={this.state.subject}
                        onChange={this.handleChange}
                        name = {"subject"}
                        >
                        <MenuItem value={"Math"}>Math</MenuItem>
                        <MenuItem value={"Biology"}>Biology</MenuItem>
                        <MenuItem value={"English"}>English</MenuItem>
                    </Select>
                </ Grid>
            </ Grid>
            
            {this.state.problems.map((problem) => {
                return this.pickSubject(problem, this.state.subject)
            })}
        </div>
     );
 }
}
 
export default Tutor;