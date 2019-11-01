import React, {Component} from 'react';
import './Message.css';
export default class Message extends Component {
  render() {

    if (this.props.message.type == "img"){
      return (
        <div className="message">
            <span className="message__author">
                {this.props.message.userName}:
            </span>
            <img src={this.props.message.image} width={"50%"} />
          
        </div>
      )
    } else {
      return (
        <div className="message">
            <span className="message__author">
                {this.props.message.userName}:
            </span>
            {this.props.message.message}         
        </div>
      )
    }
    
  }
}