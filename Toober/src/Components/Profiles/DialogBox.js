import React, {Component} from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@material-ui/core";

class DialogBox extends Component {
    render() {
        return (
            <div>
          <DialogContent>
            {this.props.text} 
             </DialogContent>
             <DialogActions>
               <Button onClick={this.props.closePopup}  variant="contained" color="primary">
                 Cancel
               </Button>
             </DialogActions>
        </div>
        )
    }
}

export default DialogBox;