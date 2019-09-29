import { createMuiTheme } from '@material-ui/core/styles';

import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';

const Theme = createMuiTheme({
    palette: {
      // Colors can be changed here
      primary: yellow,
      secondary: blue
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