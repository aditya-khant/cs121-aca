import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';
import { Link } from "react-router-dom";


export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: props.user,
      tuteeName: props.tuteeName,
      message: '',
      list: [],
    };
    
    this.messageRef = firebase.database().ref('/messages/');
    this.messageRef.on('value', (snapshot) => {
      if(snapshot.val() == null) {
        this.createWelcome();
      };
    });

    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  createWelcome() {
    var welcomeMessage = {
      userName: this.state.tuteeName,
      message: 'Start chatting with me, the tutee!'
    }
    this.messageRef.push(welcomeMessage);
    this.setState({message: ''});
    this.setState({userName: ''});
  }
  handleChange(e) {
    // Update the state when necessary
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  listenMessages() {
    this.messageRef
      .on('value', message => {
        if (message.val() !== null) {
        this.setState({
          list: Object.values(message.val()),
        });
      };
      });
  }

  exit() {
    const messages = firebase.database().ref('/messages/');
    messages.remove();
  }

  render() {
    return (
      <div className="form">
        <div className="scroller">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
{/* 
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            name="userName"
            placeholder="Your Username"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
        </div> */}
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
        <Link to = '/'><button onClick={this.exit}>Exit</button></Link>
      </div>
    );
  }
}