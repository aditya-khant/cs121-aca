import React, {Component} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import firebase from 'firebase';
import { Link } from "react-router-dom";

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            problem: props.problemID,
            tableTitle: props.tableTitle
        }
        console.log(this.state.tableTitle);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        // this.closeQuestionAndChat = this.closeQuestionAndChat.bind(this);
        // this.closeChat = this.closeChat.bind(this);
    }

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


    //   closeQuestionAndChat() {
    //     this.closeChat();
    //     // we can successfully remove the problem
    //     firebase.database().ref('problems/' + this.state.problem).remove();
    //   }

    //   closeChat() {
    //     // broken, automatically remakes
    //     let ref = firebase.database().ref('chat/' + this.state.tableTitle);
    //     ref.remove();
    //   }

    render(){
    return(
        <div padding={20}>
            <Dialog  open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Exit</DialogTitle>
            <DialogContent>
                    {/* <Link to="/" closeChat = {true} closeQuestion = {true}><Button onClick = {this.closeQuestionAndChat} variant="outlined" color="primary">My question was answered</Button></Link>
                    <Link to="/"><Button variant="outlined" color="primary">My question was not answered and I want to keep talking to this tutor</Button></Link>
                    <Link to="/" closeChat = {true} closeQuestion= {false}><Button onClick = {this.closeChat} variant="outlined" color="primary">My question was not answered but I want to talk to a new tutor</Button></Link> */}

                    <Link to= {{ pathname: '/', query: {closeChat: true, closeQuestion: true, problem: this.state.problem, tableTitle: this.state.tableTitle}}}><Button variant="outlined" color="primary">My question was answered</Button></Link>
                    <Link to="/"><Button variant="outlined" color="primary">My question was not answered and I want to keep talking to this tutor</Button></Link>
                    {/* <Link to= {{ pathname: '/', query: {closeChat: true, closeQuestion: false, problem: this.state.problem, tableTitle: this.state.tableTitle}}}><Button variant="outlined" color="primary">My question was not answered but I want to talk to a new tutor</Button></Link> */}

            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
            </DialogActions>
            </Dialog>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Exit
            </Button>
        </div>
    )
    }
}

export default Feedback;
