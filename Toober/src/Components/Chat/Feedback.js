import React, {Component} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from '../Theme.js';


class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            problem: props.problemID,
            tableTitle: props.tableTitle,
            imageURL: props.imageURL,
            tutorID: props.tutorID
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    render(){
    return(
        <div padding={20}>
        <MuiThemeProvider theme={Theme}>
            <Dialog  open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Exit</DialogTitle>
            <DialogContent>
                <Grid container spacing = {1} direction = "column" justify = "center" alignItems="center">
                    <Grid item>
                <Link to= {{ pathname: '/', query: {tutorID: this.state.tutorID, imageURL: this.state.imageURL, closeChat: true, closeQuestion: true, problem: this.state.problem, tableTitle: this.state.tableTitle}}}>
                    <Button style = {{textTransform: 'capitalize' }} variant="contained">
                        My question was answered
                    </Button>
                </Link>
                </Grid>
                <Grid item>
                <Link to="/">
                    <Button style = {{textTransform: 'capitalize'}} variant="contained">
                        My question was not answered and I want to keep talking to this tutor
                    </Button>
                </Link>
                </Grid>
                <Grid item>
                <Link to= {{ pathname: '/', query: {tutorID: this.state.tutorID, closeChat: true, closeQuestion: false, problem: this.state.problem, tableTitle: this.state.tableTitle}}}>
                    <Button style = {{textTransform: 'capitalize' }} variant="contained">
                        My question was not answered but I want to talk to a new tutor
                    </Button>
                </Link>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
            </DialogActions>
            </Dialog>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Exit
            </Button>
        </MuiThemeProvider>
        </div>
    )
    }
}

export default Feedback;
