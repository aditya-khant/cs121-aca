import React, {Component} from 'react';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';
import firebase from 'firebase';
import {retrieve} from '../Helpers.js';


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
      console.log(props.location.query);
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
    this.chatRef = firebase.database().ref('chat/' + this.state.tableTitle);
    this.problemRef = firebase.database().ref('problems/' + this.state.problem);
    if(this.state.closeChat) {
      this.removeChatImages();
      this.chatRef.remove();    
      if(this.state.closeQuestion) {
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
    const imageRelURL = await retrieve("problems", this.state.problem, "imageid")
    const storageRef = firebase.storage().ref();
    let url = ""
    // removes image file
    url = imageRelURL;
    storageRef.child(url).delete().then(function() {
      console.log("file deleted successfully");
    }).catch(function(error) {
      console.log("could not delete file")
    });
  }

  async removeChatImages() {
    const storageRef = firebase.storage().ref(this.state.tutorID + this.state.problem);
    storageRef.listAll().then(dir => {
      dir.items.forEach(fileRef => {
        this.deleteFile(ref.fullPath, fileRef.name);
      });
      dir.prefixes.forEach(folderRef => {
        this.deleteFolderContents(folderRef.fullPath);
      })
    }).catch(error => {
      console.log(error);
    })    
  }

  componentWillUnmount() {
    this.chatRef.off();
    this.problemRef.off();
    // this.storageRef.off();
    // this.allChats.off();
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
