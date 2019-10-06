import React, { Component } from 'react';
import './Form.css';
import Message from '../Messages/Message';
import firebase from 'firebase';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      message: '',
      list: [],
    };
    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
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
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }

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
            name="userName"
            placeholder="Your Username"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
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
      </div>
    );
  }
}