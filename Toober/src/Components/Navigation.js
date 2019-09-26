import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Tutor">Tutor</NavLink>
          <NavLink to="/Tutee">Tutee</NavLink>
       </div>
    );
}
 
export default Navigation;