import React, { Component } from 'react';
import firebase from '../FirebaseConfig.js';
import { Link } from "react-router-dom";
import {CircularProgress, List, ListItem, ListItemText, Button, Grid, Paper, Dialog, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ImageUploader from 'react-images-upload';
import {cleanupText, isNullEmptyUndef, retrieveMultiple} from '../Helpers.js';

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
          open: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.listChats = this.listChats.bind(this);
        this.onDrop = this.onDrop.bind(this);
      }

      onDrop(picture) {
        // Function that handles image uploads
        let urlCreator = window.URL || window.webkitURL;
        let imageBlob = new Blob(picture);
        let imageUrl = urlCreator.createObjectURL(imageBlob);
        console.log(imageUrl);
        this.setState({
            pictures: picture,
            pictures_src: imageUrl
        });

        alert("Picture Uploaded")

    };

    handleClickOpen(){
      this.setState({
          open: true,
      })
    };
  
    handleClose(){
        this.setState({
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
      console.log(typeof(file_to_upload))
      questionRef.put(file_to_upload).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
    };
   
   
    // Sets up the submission item
    const item = {
      user: this.state.email,
      problem: this.state.problem,
      subject: this.state.subject, 
      uid: this.state.uid,
      imageid: imageID
    }
    // If it cannot push to Firebase, we return an error
    itemsRef.push(item).catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
    // Set state back to empty
    this.setState({
      username: '',
      problem: '',
      subject: 'Math',
      uid: firebase.auth().currentUser.uid,
      pictures: "",
      open: false
    })
  }

  componentDidMount() {
    this.listChats();
  }


listChats(){
  const chatRef = firebase.database().ref("chat");
  let newChats = []
  chatRef.orderByChild("tuteeUID").equalTo(this.state.uid).on('value', async (snapshot) => {
    const chat_dict = snapshot.val();
    if (!isNullEmptyUndef(chat_dict)){
      for (const [, value] of Object.entries(chat_dict)) {
        const problemID = value.problem;
        const tutorUID = value.tutorUID;
        const snapVal = await retrieveMultiple("problems",problemID, ["problem","subject"]);
        newChats.push({problem: snapVal["problem"], subject: snapVal["subject"], problemID:problemID, tutorUID: tutorUID});
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
                  <Paper>
                    <ListItem>
                      <ListItemText primary={problem.problem} secondary={problem.subject} />
                      <Link style={{ textDecoration: 'none' }} to= {{ pathname: '/Chat', query: {user: this.state.email, tuteeName: false, tuteeUID: this.state.uid, tutorUID: problem.tutorUID,  problemID: problem.problemID}}}>
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
   
    return (
      <div style={{ padding: 20}}>
        
        <MuiThemeProvider theme={Theme}>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add your question</DialogTitle>
              <DialogContent>
              <Grid container justify="center"  direction="row">
              <form onSubmit={this.handleSubmit} style={{ width: "500px" }} /*Change this to Form Control*/>

                <input type="text" name="problem" placeholder="What is the problem you are working on?" onChange={this.handleChange} value={this.state.problem}/>
                <select id="lang" name="subject" onChange={this.handleChange} value={this.state.subject}>
                    <option value="Math">Math</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                </select>
              
              <ImageUploader
                    withIcon={false}
                    buttonText='Upload image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                />
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
               </form>
               </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}  variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
          </Dialog>   
        <Grid container direction = "row">
          <Grid item>
            <h1>Tutee</h1>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
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