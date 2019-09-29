import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
 
class Tutor extends Component {
    constructor() {
        super();
        // We will populate this list with data from Firebase
        this.state = {
          problems: []
        }
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
 
render(){
    return (
        <div>
           <h1>Tutor</h1>
            <p>tutor page</p>
            <h2> Problem Sets</h2>
            {this.state.problems.map((problem) => {
                return (
                    <div key={problem.id}>
                        <div>
                            <div>
                                <h3>{problem.subject} : {problem.problem}</h3>
                                <p>{problem.username}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
     );
 }
}
 
export default Tutor;