import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from '../../FirebaseConfig.js';
import { Link } from "react-router-dom";
import {retrieve, isNullEmptyUndef, cleanupText } from "../../Helpers"
import {Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress} from "@material-ui/core"
import ImageUploader from 'react-images-upload';
import Filter from 'bad-words';
import Tesseract from 'tesseract.js';

import Theme from '../Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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
      open: false,
      pictures:  "",
      loading: false,
      tableRef: props.problemID.concat(props.tutorUID),
      tutorName: ""
    };

    this.filter = new Filter({placeHolder: " "});
    this.exit = this.exit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSendImage = this.handleSendImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {

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
       problemImgUrl: url
    })
  }

  componentWillUnmount() {
    this.messageRef.off();
    this.chatRef.off();
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

  async createChat() {
    // creates the chat in firebase
    if(this.state.isTutor) {
      this.setState({
        tutorName: firebase.auth().currentUser.displayName
      })
    }

    var welcomeMessage = {
      problem: this.state.problem,
      tuteeUID: this.state.tuteeUID,
      tutorUID: this.state.tutorUID,
      tutorEmail: this.state.userName,
      tutorName: this.state.tutorName
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
      let message = this.state.message;
      // sets the message and username for the databse
      if (this.filter.isProfane(message)){
        alert("Please refrain from using profanity in your messages");
      } else {
      var newItem = {
        // userName: this.state.userName,
        userName: firebase.auth().currentUser.displayName,
        message: message,
        type: "text"
      }
      // pushes the message
      this.messageRef.push(newItem);
     }
      this.setState({ message: '' });
    }
  }

  handleKeyPress(event) {
    // allows you to hit enter to send your message
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  handleClickOpen(){
    //Modal Opening
    this.setState({
        open: true,
    })
  };

  handleClose(){
    //Modal Close
      this.setState({
          open: false,
          pictures: "",
      })
  };

  async handleSendImage(){
  
    // Either initializes a problems collection in Firebase
    // Or sends it to the existing one
    let imageID = "";
    if (this.state.pictures !== "") {
      this.setState({
        loading: true,
      })
      const file_to_upload = new Blob(this.state.pictures)
      const storageRef = firebase.storage().ref();
      imageID = 'chat/'+cleanupText(this.state.problem)+cleanupText(this.state.tutorUID)+ '/' + cleanupText(Date.now().toString()) + '.jpg' 
      const questionRef = storageRef.child(imageID);
      await questionRef.put(file_to_upload);
      const newItem = {
        // userName: this.state.userName,
        userName: firebase.auth().currentUser.displayName,
        image: imageID,
        type: "img"
      }
      // pushes the message
      this.messageRef.push(newItem);
      // Set state back to empty
      this.setState({
        pictures: "",
        open: false,
        loading: false,
      })
     
    };

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
    const {isTutor, tutorUID, timeStart, problem} = this.state;
    if (isTutor){
      let rawDiff = Date.now() - timeStart;
      let minDiff = Math.round((rawDiff/1000)/60)
      let minSubDiff = minDiff;
      const subject = await retrieve("problems",problem, "subject");
      let currTime = await retrieve("users", tutorUID, "tutorTime");
      let currSubTime = await retrieve("users", tutorUID, "tutorTime_"+subject);
      if (!isNullEmptyUndef(currTime)){
        minDiff += currTime
      }
      if (!isNullEmptyUndef(currSubTime)){
        minSubDiff += currSubTime
      }
      let updateObj = {
        tutorTime: minDiff
      };
      updateObj["tutorTime_"+subject] = minSubDiff;
      let userRef = firebase.database().ref('users/'+ tutorUID);
      userRef.update(updateObj);
    }
  }

  async onDrop(picture) {
    // Function that handles image uploads
    this.setState({
      loading: true,
    });
    let imageBlob = new Blob(picture);
    const tesseract = await Tesseract.recognize(imageBlob,'eng');
    const text = tesseract.data.text;
    if (this.filter.isProfane(text)){
      alert("Please do not upload images with profanity");
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        pictures: picture,
        loading: false,
     });
    }
   

   

};

  render() {
    let header;
    const imageURL = this.state.problemImgUrl;
    const problemName = this.state.problemText;
    const exitLink = this.state.isTutor ? "/Tutor" : "/Tutee";
    if (imageURL !== ""){
      header = (
        // { <Grid container spacing = {4}> }
          <div className="problem">
            <h4>{problemName}</h4>

            <img src={imageURL} alt = "the problem" width="100%" />
            </div>
      )
    } else {
      header = (
        <div>
          <Grid item xs= {10}>
          <h4>{problemName}</h4>
          </Grid>
        </div>
      )
    }
    let imageUploader;
    if (this.state.pictures !== ""){
       imageUploader = (<h4>Image Uploaded!</h4>);
    } else {
      imageUploader = (
        <ImageUploader
        withIcon={false}
        buttonText='Upload image'
        onChange={this.onDrop}
        imgExtension={['.jpg', '.png', '.gif']}
        maxFileSize={5242880}
        singleImage={true}
      />
      );
    }

    let dialogBox;
    if (this.state.loading){
      dialogBox = (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ height: "100px" }}
        >
          <CircularProgress />
        </Grid>  
      );
    } else {
      dialogBox = (
        <div>
        <DialogContent>
            <Grid container justify="center"  direction="row">     
              {imageUploader}
                <Button variant="contained" color="primary" onClick={this.handleSendImage}>
                  Send
                </Button>
              </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}  variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
        </div>
      );
    }

   

   
    if (!this.state.isTutor)
    {
      return(
   <div>
      <MuiThemeProvider theme={Theme}>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Send an image</DialogTitle>     
              {dialogBox}         
      </Dialog> 
      <div>
      {/* <Grid container direction= "row" spacing={10}> */}
        {/* <Grid  item> */}
          <div className="header">
          {header}
          </div>
        {/* </Grid>
        <Grid item> */}
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSend.bind(this)}
              >
                send
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleClickOpen.bind(this)}
              >
                Upload Image
              </Button>
            </div>
                <Feedback problemID = {this.state.problem} tableTitle = {this.state.tableRef} tutorID = {this.state.tutorUID}></Feedback>
          </div>
         {/* </Grid>
         </Grid> */}
         </div>
      </MuiThemeProvider>
      
    </div>
      )
    } else {
      return (
        <div padding={20}>
          <MuiThemeProvider theme={Theme}>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add your question</DialogTitle>     
              {dialogBox}         
          </Dialog> 
          {/* <Grid container spacing={2}>
            <Grid item xs={3}> */}
              <div className="header">
              {header}
              </div>
            {/* </Grid>
            <Grid item xs={9}> */}
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
                  <Button
                variant="contained"
                color="primary"
                onClick={this.handleSend.bind(this)}
              >
                send
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleClickOpen.bind(this)}
              >
                Upload Image
              </Button>
                </div>

                <Link to={exitLink} ><Button color="primary">Exit</Button></Link>
    
              </div>
             {/* </Grid>
          </Grid> */}
          </MuiThemeProvider>
        </div>    
    );
  }
}
}