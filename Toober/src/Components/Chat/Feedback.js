import React, {Component} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";


class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            open: false
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
            <Dialog  open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Exit</DialogTitle>
            <DialogContent> </DialogContent>
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
