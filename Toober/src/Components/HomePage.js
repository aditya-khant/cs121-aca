import React, {Component} from 'react';

import Theme from './Theme.js';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import FancyHomeButtons from'./Subcomponents/FancyHomeButtons';
import firebase from 'firebase';


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
  };
  
  componentDidMount() {
    // On load, this opens the database connections and removes
    // what needs to be removed (the chat or the problem) depending
    // on the properties passed in
    this.chatRef = firebase.database().ref('chat/' + this.state.tableTitle);
    this.problemRef = firebase.database().ref('problems/' + this.state.problem);
    if(this.state.closeChat) {
      this.chatRef.remove();
      if(this.state.closeQuestion) {
        this.problemRef.remove();
      }
    }

    // this.allChats.orderByChild("problem").equalTo(this.state.problem).remove()
    //     this.allChats = firebase.database().ref('chat/');

    this.setState({
      closeChat: false,
      closeQuestion: false
    })
  }

  componentWillUnmount() {
    this.chatRef.off();
    this.problemRef.off();
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
