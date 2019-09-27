import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig.js';
 
class Tutor extends Component {
    constructor() {
        super();
        this.state = {
          problems: []
        }
        }

componentDidMount() {
    const problemRef = firebase.database().ref('problems');
    problemRef.on('value', (snapshot) => {
        let problems = snapshot.val();
        let newState = [];
        for (let id in problems) {
            newState.push({
                username: problems[id].user,
                problem: problems[id].problem
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
                    <div>
                        <div>
                            <div>
                                <h3>{problem.problem}</h3>
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