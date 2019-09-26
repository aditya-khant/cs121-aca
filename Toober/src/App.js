// import React, { Component } from 'react'
// import './App.css'

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Hello, React!</h1>
//       </div>
//     )
//   }
// }

// export default App

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './Components/HomePage';
import Tutor from './Components/TutorPage';
import Navigation from './Components/Navigation';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
        <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/tutor" component={Tutor}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;