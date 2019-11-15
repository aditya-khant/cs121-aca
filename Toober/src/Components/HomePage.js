import React, {Component} from 'react';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';
import firebase from 'firebase';
import { REFUSED } from 'dns';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeChat: false,
      closeQuestion: false,
      problem: "",
      tableTitle: "",
      tuteeID: "",
      tutorID: ""
    }
    if(props.location.query) {
      console.log(props.location.query);
      this.state = {
        closeChat: props.location.query.closeChat,
        closeQuestion: props.location.query.closeQuestion,
        problem: props.location.query.problem,
        tableTitle: props.location.query.tableTitle,
        tuteeID: props.location.query.tuteeID,
        tutorID: props.location.query.tutorID
      }
    }
    this.closeChat = this.closeChat.bind(this);

  };
  
  componentDidMount() {
    console.log(this.state.tableTitle);
    this.chatRef = firebase.database().ref('chat/' + this.state.tableTitle);
    this.problemRef = firebase.database().ref('problems/' + this.state.problem);
    if(this.state.closeChat) {
      this.closeChat();
      if(this.state.closeQuestion) {
        this.problemRef.remove();
      }
    }

    this.setState({
      closeChat: false,
      closeQuestion: false
    })
  }

  closeChat() {
    // firebase.database().ref('chat/' + this.state.tableTitle + "/problem").remove().then(function() {
    //   console.log("Remove problem succeeded.")
    // });
    // firebase.database().ref('chat/' + this.state.tableTitle + "/tutorUID").remove().then(function() {
    //   console.log("Remove tutor uid succeeded.")
    // });
    // firebase.database().ref('chat/' + this.state.tableTitle + "/tuteeUID").remove().then(function() {
    //   console.log("Remove tuteeUID succeeded.")
    // });
    // firebase.database().ref('chat/' + this.state.tableTitle + "/messages/").remove();
    this.chatRef.remove();
  }

  componentWillUnmount() {
    this.chatRef.off();
    this.problemRef.off();
  }

  render() {
    return (
      <div>
      <MuiThemeProvider theme={Theme}>
        <div>
        <Grid container spacing={3} justify="center"  direction="row" >
          <Grid item >
              <h1>Please select your role:</h1>
          </ Grid>
          </ Grid>
      <FancyHomeButtons />
        </div>
      </MuiThemeProvider>
      </div>
    );
  }
}
 
export default HomePage;
