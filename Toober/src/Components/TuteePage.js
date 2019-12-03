import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import { Link } from "react-router-dom";
import {CircularProgress, List, ListItem, ListItemText, Button, Grid, Paper, Dialog, DialogTitle} from '@material-ui/core';
import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ImageUploader from 'react-images-upload';
import {cleanupText, isNullEmptyUndef, retrieveMultiple} from '../Helpers.js';
import Filter from 'bad-words';
import Tesseract from 'tesseract.js';
import DialogBox from './Profiles/DialogBox';

class Tutee extends Component {
    constructor() {
        super();
        // The user inputs these items
        // This is the data sent to the database
        this.state = {
          username: '',
          problem: '',
          subject: 'Math', 
          uid: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
          pictures: "",
          pictures_src: "",
          isLoading: true,
          open: false,
          loadingDialog: false,
          name: firebase.auth().currentUser.displayName
        }

        this.filter = new Filter({placeHolder: " "});

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.listChats = this.listChats.bind(this);
        this.onDrop = this.onDrop.bind(this);
      }

      async onDrop(picture) {
        // Function that handles image uploads
        this.setState({
          loadingDialog: true,
        });
        let imageBlob = new Blob(picture);
        const tesseract = await Tesseract.recognize(imageBlob,'eng');
        const text = tesseract.data.text;
        if (this.filter.isProfane(text)){
          alert("Please do not upload images with profanity");
          this.setState({
            loadingDialog: false,
          });
        } else {
          this.setState({
            pictures: picture,
            loadingDialog: false,
         });
        }

    };

    handleClickOpen(){
      this.setState({
          open: true,
      })
    };
  
    handleClose(){
        this.setState({
           pictures: "",
            open: false,
        })
    };
    
  handleChange(e) {
    // Update the state when necessary
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    // Either initializes a problems collection in Firebase
    // Or sends it to the existing one
    let imageID = ""
    const itemsRef = firebase.database().ref('/problems/');
    if (this.state.pictures !== "") {
      const file_to_upload = new Blob(this.state.pictures)
      const storageRef = firebase.storage().ref();
      imageID = 'questions/'+cleanupText(this.state.uid)+cleanupText(this.state.problem) + '.jpg' 
      const questionRef = storageRef.child(imageID);
      questionRef.put(file_to_upload).then(function(snapshot) {

      });
    };
   
    let problem = this.state.problem;
    if (this.filter.isProfane(problem)){
      alert("Please refrain from using profane language in your problems.");
    } else {
      // Sets up the submission item
      const item = {
        user: this.state.email,
        problem: problem,
        subject: this.state.subject, 
        uid: this.state.uid,
        imageid: imageID,
        name: this.state.name
      }
    
    // If it cannot push to Firebase, we return an error
    itemsRef.push(item)
    }
    // Set state back to empty
    this.setState({
      username: '',
      problem: '',
      subject: 'Math',
      uid: firebase.auth().currentUser.uid,
      pictures: "",
      open: false,
      name: ''
    });
 }

  componentDidMount() {
    this.listChats();
  }
  
  componentWillUnmount() {
    this.chatRef.off();
  }


listChats(){
  this.chatRef = firebase.database().ref("chat");
  let newChats = []
  this.chatRef.orderByChild("tuteeUID").equalTo(this.state.uid).on('value', async (snapshot) => {
    const chat_dict = snapshot.val();
    if (!isNullEmptyUndef(chat_dict)){
      for (const [, value] of Object.entries(chat_dict)) {
        const problemID = value.problem;
        const tutorUID = value.tutorUID;
        const tutorName = value.tutorName;
        const snapVal = await retrieveMultiple("problems",problemID, ["problem","subject"]);
        newChats.push({problem: snapVal["problem"], subject: snapVal["subject"], tutorName: tutorName, problemID:problemID, tutorUID: tutorUID});
      }
      
    } 
    this.setState({
      chatList: newChats,
      isLoading:false, 
    });
  });
  
 
}
    
  render() {
    const chatList = this.state.chatList;
    let list;
    if (this.state.isLoading){
      list = (
        <CircularProgress />
      );
    }else {
      list = (
        <List>
              {chatList.map((problem) => {
                return (
                  <Paper key={problem.problemID + problem.tutorUID}>
                    <ListItem>
                      <ListItemText primary={problem.problem} secondary={ <Link to={{pathname: "/Profile", query: {tutorUID: problem.tutorUID, tutorName: problem.tutorName}}} > Tutor: {problem.tutorName} </Link> } />
                      <Link style={{ textDecoration: 'none' }} to= {{ pathname: '/Chat', query: {user: this.state.email,  tuteeName: {isTutor: false, chattingWith: problem.tutorName}, tuteeUID: this.state.uid, tutorUID: problem.tutorUID,  problemID: problem.problemID}}}>
                      <Button variant="contained" color="secondary">
                        Chat!
                      </Button>
                    </Link>
                    </ListItem>
                  </Paper>

                )})}
            </List>
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


    
    let content;
    if (this.state.loadingDialog){
      content = (
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
      content = (
             <Grid container justify="center"  direction="row">
             <form onSubmit={this.handleSubmit} style={{ width: "500px" }} /*Change this to Form Control*/>

               <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
               <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                   <option value="Math">Math</option>
                   <option value="Biology">Biology</option>
                   <option value="English">English</option>
               </select>
             
                {imageUploader}
               <Button variant="contained" type="submit" color="primary">
                 Submit
               </Button>
              </form>
              </Grid>
            )
    }
   
    return (
      <div style={{ padding: 20}}>
        
        <MuiThemeProvider theme={Theme}>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add your question</DialogTitle>
              <DialogBox text = {content} closePopup = {this.handleClose}></DialogBox>
          </Dialog>   
        <Grid container direction = "row">
          <Grid item>
            <h1>Tutee</h1>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
              Add Question
            </Button>
                             
          </Grid>
        </Grid>
            {list}
          </MuiThemeProvider>
        </div>
      );
    }
}
 
export default Tutee;