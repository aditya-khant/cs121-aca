import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig.js';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      problem: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('/problems/');
    const item = {
      user: this.state.username,
      problem: this.state.problem
    }
    itemsRef.push(item).catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
    this.setState({
      username: '',
      problem: ''
    })
  }
  
render(){
  return (
     <div>
        <h1>Home Page</h1>
      <Button variant="contained" color="secondary" href="/Tutor">
        Tutor
      </Button>
      <Button variant="contained" color="secondary" href="/Tutee">
        Tutee
      </Button>
      <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
          <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
          <button>Add Question</button>
      </form>
     </div>
  );
}
}
 
export default HomePage;