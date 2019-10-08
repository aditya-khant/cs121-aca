import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";

export default class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          open: false,
          setOpen: false,
          tuteeName: props.tuteeName
        };
    };

    handleClickOpen = () => {
      // When it is clicked, the popup should open
      this.setState({setOpen:true});
      this.setState({open:true});
    };
  
    handleClose = () => {
        // if it's canceled the popup closes
        this.setState({setOpen: false});
        this.setState({open: false});
    };

    handleChange = (e) => {
        // saves the username that the tutor enters
        this.setState({userName: e.target.value});
    };

    render() {
        return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Input Username
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Please input your username here.</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              value = {this.state.userName}
              onChange = {this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Link to= {{ pathname: '/Chat', query: {user: this.state.userName, tuteeName: this.state.tuteeName}}}>
            <Button onClick={this.handleClose} color="primary">
              Continue
            </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )};
  }
