import React from 'react';
import { Grid } from '@material-ui/core';

function ProblemHeader(props) {
    let header;
    if (props.imageURL !== ""){
        // if there is an image, create the header with it
        header = (
            <div >
              <h4>Chatting with {props.chattingWith} about: </h4>
              <h4>{props.problemName}</h4>
  
              <img src={props.imageURL} alt = "the problem" width="100%" />
              </div>
        )
      } else {
        header = (
          <div>
            <Grid item xs= {10}>
            <h4>Chatting with {props.chattingWith} about: </h4>
            <h4>{props.problemName}</h4>
            </Grid>
          </div>
        )
      }
    return (
        header
    )
}

export default ProblemHeader;