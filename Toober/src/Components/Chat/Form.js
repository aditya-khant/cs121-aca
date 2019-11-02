import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';
import { Link } from "react-router-dom";
import {retrieve} from "../../Helpers"

export default class Form extends Component {

  constructor(props) {
    super(props);
    // sets the state from props
    this.state = {
      userName: props.user,
      tuteeName: props.tuteeName,
      tuteeUID: props.tuteeUID,
      tutorUID: props.tutorUID,
      message: '',
      list: [],
      problem: props.problemID,
      problemText: "",
      problemImgUrl: ""
    };
  }

  componentDidMount() {

    this.chatRef = firebase.database().ref('chat/' + this.state.problem.concat(this.state.tutorUID));
    this.messageRef = firebase.database().ref('chat/' + this.state.problem.concat(this.state.tutorUID) +'/messages');
    this.messageRef.on('value', (snapshot) => {
      // if there are no messages in the database, we will generate a welcome message
      if(snapshot.val() == null) {
         this.createWelcome();
      };
    });
    this.chatRef.on('value', (snapshot) => {
      // if there are no messages in the database, we will generate a welcome message
      if(snapshot.val() == null) {
        this.createChat();
      };
    });
    this.setProblemTextandImage();
    this.listenMessages();
    
    
  }

  async setProblemTextandImage(){
    // Downloads the problem's text and image and sets it in the state
    const problemName = await retrieve("problems", this.state.problem, "problem")
    const imageRelURL = await retrieve("problems", this.state.problem, "imageid")
    const storageRef = firebase.storage().ref();
    const url = await storageRef.child(imageRelURL).getDownloadURL()
    this.setState({
       problemText: problemName,
       problemImgUrl: url,
    })

  }

  componentWillUnmount() {
    this.messageRef.off();
  }

  async createWelcome() {
    // creates the welcome message
    
    const tuteeName = this.state.tuteeUID;
    const tutorName = this.state.tutorUID;
    let messageRef = this.messageRef;
    const welcomeMessage = {
      userName: "Toober",
      message: "Start chatting",
      type: "text",
      image: ""
    }
    messageRef.push(welcomeMessage);
    this.setState({message: ''});
  }

  createChat() {
    // creates the chat in firebase
    var welcomeMessage = {
      problem: this.state.problem,
      tuteeUID: this.state.tuteeUID,
      tutorUID: this.state.tutorUID
    }

    this.chatRef.set(welcomeMessage);
    this.setState({message: ''});
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
        type: "text"
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
    let header;
    const imageURL = this.state.problemImgUrl;
    const problemName = this.state.problemText;
    if (imageURL != ""){
      header = (
        <div>
          <h1>{problemName}</h1>
          <img src={imageURL} width="50%" />
        </div>
      )
    } else {
      header = (
        <div>
          <h1>{problemName}</h1>
        </div>
      )
    }

    return (
    <div>
      {header}
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
        <Link to = '/'><button>Exit</button></Link>
      </div>
    </div>
    );
  }
}