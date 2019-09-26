import React from 'react';
import Button from '@material-ui/core/Button';

const home = () => {
    return (
       <div>
          <h1>Home</h1>
           <p>Home page body content</p>
        <Button variant="contained" color="secondary" href="/Tutor">
          Tutor
        </Button>
        <Button variant="contained" color="secondary" href="/Tutee">
          Tutee
        </Button>
       </div>
    );
}
 
export default home;