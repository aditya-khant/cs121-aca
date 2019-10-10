import React, { Component } from 'react';
import './ChatPage.css';
import Form from './Form.js';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // From the properties, it gets the tutor's username and the tutee's username
      user: props.location.query.user,
      tuteeName: props.location.query.tuteeName,
      tuteeUID: props.location.query.tuteeUID
    } 
  }

  render() {
    console.log(this.state.tuteeUID)
    return (
      <div className="app">
        <div className="app__header">
        </div>
        <div className="app__list">
          <Form user={this.state.user} tuteeName={this.state.tuteeName} tuteeUID = {this.state.tuteeUID} />
        </div>
      </div>
    );
  }
}

export default ChatPage;