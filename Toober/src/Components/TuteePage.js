import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import Popup from './Popup.js'
import { Link } from "react-router-dom";

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
          email: firebase.auth().currentUser.email,
          showPopup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
  
  togglePopup() {  
    this.setState({  
          showPopup: !this.state.showPopup
        });  
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

  clicked() {
    var fire = firebase.database().ref();
    console.log(fire);
  }
    
  render() {
    return (
      <div>
        <h1>Tutee</h1>
          <form onSubmit={this.handleSubmit} /*Change this to Form Control*/>
            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
            <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
            <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                <option value="Math">Math</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
            </select>
            <button /*This will not work with a Material UI "Button"!*/ >Add Question</button>

            {/* <Link to= {{ pathname: '/Chat', query: {user: this.state.email, tuteeName: this.state.email, tuteeUID: this.state.uid}}}> */}
            <button onClick = {this.clicked} >Go to chat!</button>
            {/* </Link> */}


            {/* <Link ><button>Go to chat!</button></Link>
            <button onClick={this.togglePopup.bind(this)}>Go to chat!</button>
          {this.state.showPopup ? <Popup tuteeName = {this.state.username} tuteeUID = {this.state.uid}/> : null } */}
          </form>
        </div>
      );
    }
}
 
export default Tutee;