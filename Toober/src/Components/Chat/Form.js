import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';
import { Link } from "react-router-dom";


export default class Form extends Component {

  constructor(props) {
    super(props);
    // sets the state from props
    var nothing = props.user; 
    this.state = {
      userName: props.user,
      tuteeName: props.tuteeName,
      tuteeUID: props.tuteeUID,
      tutorUID: firebase.auth().currentUser.uid,
      message: '',
      list: []
    };
    
    // gets a snapshot of the databse
    this.messageRef = firebase.database().ref(this.state.tutorUID.concat(this.state.tuteeUID));
    this.messageRef.on('value', (snapshot) => {
      // if there are no messages in the database, we will generate a welcome message
      if(snapshot.val() == null) {
        this.createWelcome();
      };
    });

    this.listenMessages();
  }

  createWelcome() {
    // creates the welcome message
    var welcomeMessage = {
      userName: this.state.tuteeName,
      message: 'Start chatting with me!',
      tuteeUID: this.state.tuteeUID,
      tutorUID: this.state.tutorUID
    }
    // var users = {
    //   userName: "Toober",
    //   message: "You are now connected with " + this.state.tuteeName,
    //   tuteeUID: this.state.tuteeUID,
    //   tutorUID: this.state.tutorUID
    // }
    // pushes it to the database
    // which will later get read and updated on the page
    // this.messageRef.push(users);

    this.messageRef.push(welcomeMessage);

    // sets the state back to empty
    this.setState({message: ''});
    this.setState({userName: this.state.user});
  }

  handleChange(e) {
    // Update the state when necessary
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSend() {
    // when the message is typed
    // this sends it
    if (this.state.message) {
      // sets the message and username for the databse
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      // pushes the message
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }

  handleKeyPress(event) {
    // allows you to hit enter to send your message
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  listenMessages() {
    // renders the data from the database
    this.messageRef
      .on('value', message => {
        // prints anything with a non-null message
        if (message.val() !== null) {
        this.setState({
          list: Object.values(message.val()),
        });
      };
      });
  }

  // exit() {
  //   // when you press the exit button, it clears the messages from the database
  //   const messages = firebase.database().ref(this.concatstuff);
  //   this.messageRef.remove();
  // }

  render() {
    return (
      <div className="form">
        <div className="scroller">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            name="message"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
        {/* <Link to = '/'><button onClick={this.exit}>Exit</button></Link> */}
        <Link to = '/'><button>Exit</button></Link>
      </div>
    );
  }
}