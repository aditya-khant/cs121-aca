import React, { Component } from 'react';
import './ChatPage.css';
import Form from './ChatForm/Form.js';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  
  render() {
    return (
      <div className="app">
        <div className="app__header">
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default ChatPage;