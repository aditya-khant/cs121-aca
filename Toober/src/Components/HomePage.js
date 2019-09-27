import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class HomePage extends Component {
  constructor() {
    super();
  }


  
render(){
  return (
     <div>
        <h1>Home Page</h1>
      <Button variant="contained" color="secondary" href="/Tutor">
        Tutor
      </Button>
      <Button variant="contained" color="secondary" href="/Tutee">
        Tutee
      </Button>

     </div>
  );
}
}
 
export default HomePage;