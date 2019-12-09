import React, {Component} from 'react';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';
import firebase from 'firebase';
import {retrieve, cleanupText} from '../Helpers.js';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeChat: false,
      closeQuestion: false,
      problem: "",
      tableTitle: "",
      tuteeID: "",
      tutorID: "",
      imageURL: ""
    }
    if(props.location.query) {
      this.state = {
        closeChat: props.location.query.closeChat,
        closeQuestion: props.location.query.closeQuestion,
        problem: props.location.query.problem,
        tableTitle: props.location.query.tableTitle,
        tuteeID: props.location.query.tuteeID,
        tutorID: props.location.query.tutorID,
        imageURL: props.location.query.imageURL
      }
    }
  };
  
  componentDidMount() {
    // On load, this opens the database connections and removes
    // what needs to be removed (the chat or the problem) depending
    // on the properties passed in
    this.problemRef = firebase.database().ref('problems/' + this.state.problem);
    this.chatRef = firebase.database().ref('chat/')
    if(this.state.closeChat) {
      this.removeChatImages();
      this.chatRef.child(this.state.tableTitle).remove();    
      if(this.state.closeQuestion) {
        let allChats = this.chatRef.orderByChild("problem").equalTo(this.state.problem);
        allChats.on('value', snapshot => snapshot.forEach(child => child.ref.remove()));
        this.removeProblemImage();
        this.problemRef.remove();
      }
    }
    this.setState({
      closeChat: false,
      closeQuestion: false
    })
  }

  async removeProblemImage() {
    // creates a reference to the image collection in the database and the storage
    // removes the image associated with the problem
    const imageRelURL = await retrieve("problems", this.state.problem, "imageid")
    const storageRef = firebase.storage().ref();
    let url = ""
    url = imageRelURL;
    storageRef.child(url).delete().then(function() {
      console.log("file deleted successfully");
    }).catch(function(error) {
      console.log("could not delete file")
    });
  }

  removeChatImages() {
    // need to add functionality so that when there are no images with the chats
    // the console doesn't yell about it not existing
    let path = cleanupText(this.state.problem + this.state.tutorID)
    const storageRef = firebase.storage().ref("chat/" + path);
    storageRef.listAll().then(dir => {
      dir.items.forEach(fileRef => {
        fileRef.delete().then(function() {
          console.log("image deleted successfully")
        }).catch(function(error) {
          console.log("could not delete")
        });
      })
    })  
  }

  componentWillUnmount() {
    this.chatRef.off();
    this.problemRef.off();
  }

  render() {
    return (
      <div>
      <MuiThemeProvider theme={Theme}>
        <Grid container justify="center"  direction="row" >
          <Grid item >
              <h1>Please select your role:</h1>
          </ Grid>
          </ Grid>
      <FancyHomeButtons />
    </MuiThemeProvider>
      </div>
    );
  }
}
 
export default HomePage;
