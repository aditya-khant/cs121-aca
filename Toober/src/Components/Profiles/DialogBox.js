import React, {Component} from 'react';
import {DialogActions, DialogContent, Button } from "@material-ui/core";

function DialogBox(props) {
  return (
    <div>
      <DialogContent>
        {props.text} 
      </DialogContent>
        <DialogActions>
          <Button onClick={props.closePopup}  variant="contained" color="primary">
            Cancel
          </Button>
      </DialogActions>
    </div>
  )
}

export default DialogBox;