import { createMuiTheme } from '@material-ui/core/styles';

import { orange, green, red, yellow, blue } from '@material-ui/core/colors';

const Theme = createMuiTheme({
    palette: {
      // Colors can be changed here
      primary: blue,
      secondary: yellow,
      warning: orange,
      success: green,
      danger : red,
  }, 
  typography: {
    // Everything is default rendered with font size 20
    // Cannot give tabs custom font size like button
    fontSize: 20,
    button: {
        fontSize: 14,
      },
  },
  
 });


 export default Theme;