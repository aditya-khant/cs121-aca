import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import Popup from './Popup.js'

class Tutor extends Component {
    constructor(props) {
        super(props);
        // We will populate this list with data from Firebase
        this.state = {
          problems: [],
          subject: 'Math', 
          showPopup: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup
            });  
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
                        <button onClick={this.togglePopup.bind(this)}>Go to chat!</button>
                        {this.state.showPopup ? <Popup tuteeName = {problem.username} /> : null }
                    </div>
                </div>
            </div>
        )} 
        return null
}
 
render(){
    return (
        <div>
           <h1>Tutor</h1>
            <h2> Problem Sets</h2>
            <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                <option value="Math">Math</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
            </select>
            {this.state.problems.map((problem) => {
                return this.pickSubject(problem, this.state.subject)
            })}
        </div>
     );
 }
}
 
export default Tutor;