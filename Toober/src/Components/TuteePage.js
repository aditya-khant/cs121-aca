import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig.js';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';


class Tutee extends Component {
    constructor() {
        super();
        this.state = {
          username: '',
          problem: '',
          subject: 'math'
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
      problem: this.state.problem,
      subject: this.state.subject
    }
    itemsRef.push(item).catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
    this.setState({
      username: '',
      problem: '',
      subject: ''
    })
  }
    
  render() {
    return (
        <div>
          <h1>Tutee</h1>
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
            <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
            <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                  <option value="Math">Math</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
               </select>
        <button>Add Question</button>
      </form>
       </div>

    );
    }
}
 
export default Tutee;