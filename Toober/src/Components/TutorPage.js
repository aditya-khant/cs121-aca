import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
 
class Tutor extends Component {
    constructor() {
        super();
        // We will populate this list with data from Firebase
        this.state = {
          problems: [],
          subject: 'Math'
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
                if (problem.subject === this.state.subject) {
                return (
                    <div key={problem.id}>
                        <div>
                            <div>
                                <h3>{problem.problem}</h3>
                                <p>{problem.username}</p>
                            </div>
                        </div>
                    </div>
                )} 
                return null
            })}
        </div>
     );
 }
}
 
export default Tutor;