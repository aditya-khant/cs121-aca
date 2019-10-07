import React, { Component } from 'react';
import './ChatPage.css';
import Form from './Form.js';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.location.query.user,
      tuteeName: props.location.query.tuteeName
    } 
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
        </div>
        <div className="app__list">
          <Form user={this.state.user} tuteeName={this.state.tuteeName} />
        </div>
      </div>
    );
  }
}

export default ChatPage;