import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';
import { Link } from "react-router-dom";
import {retrieve, isNullEmptyUndef} from "../../Helpers";
import {Grid, Button} from "@material-ui/core";
import Feedback from './Feedback';

export default class Form extends Component {

  constructor(props) {
    super(props);
    // sets the state from props
    this.state = {
      userName: props.user,
      isTutor: props.tuteeName,
      tuteeUID: props.tuteeUID,
      tutorUID: props.tutorUID,
      message: '',
      list: [],
      problem: props.problemID,
      problemText: "",
      problemImgUrl: "", 
      timeStart: 0,
    };

    console.log(props)
    this.exit = this.exit.bind(this);
  }

  componentDidMount() {

    console.log(this.state)
    if (this.state.isTutor){
        let startTime = Date.now()
        this.setState({
          timeStart: startTime,
        })
    }
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
    let url = "";
    try{
      url = await storageRef.child(imageRelURL).getDownloadURL()
    } catch {

    }
    this.setState({
       problemText: problemName,
       problemImgUrl: url,
    })


  }

  componentWillUnmount() {
    this.messageRef.off();
    this.exit()
  }

  async createWelcome() {
    // creates the welcome message
    
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

  async exit() {
    // when you press the exit button, it sets the timer for the tutor
    const {isTutor, tutorUID, timeStart} = this.state;
    if (isTutor){
      let rawDiff = Date.now() - timeStart;
      let minDiff = Math.round((rawDiff/1000)/60)
      let currTime = await retrieve("users", tutorUID, "tutorTime");
      if (!isNullEmptyUndef(currTime)){
        minDiff += currTime
      }
      let userRef = firebase.database().ref('users/'+ tutorUID);
      userRef.update({tutorTime: minDiff})
    }
  }


  render() {
    let header;
    const imageURL = this.state.problemImgUrl;
    const problemName = this.state.problemText;
    const exitLink = this.state.isTutor ? "/Tutor" : "/Tutee";
    if (imageURL !== ""){
      header = (
        <div>
          <h1>{problemName}</h1>
          <img src={imageURL} alt = "the problem" width="100%" />
        </div>
      )
    } else {
      header = (
        <div>
          <h1>{problemName}</h1>
        </div>
      )
    }

    if (!this.state.isTutor)
    {
      return(
   <div padding={20}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {header}
        </Grid>
        <Grid item xs={9}>
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
                <Feedback></Feedback>
          </div>
         </Grid>
      </Grid>
    </div>
      )
    } else {
      return (
        <div padding={20}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {header}
            </Grid>
            <Grid item xs={9}>
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

                <Link to={exitLink} ><Button color="primary">Exit</Button></Link>
    
              </div>
             </Grid>
          </Grid>
        </div>    
    );
  }
}
}