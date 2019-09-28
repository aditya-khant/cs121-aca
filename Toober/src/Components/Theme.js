import { createMuiTheme } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

const Theme = createMuiTheme({
    palette: {
      primary: yellow,
      secondary: blue
  }, 
  typography: {
    fontSize: 20,
    button: {
        fontSize: 14,
      },
  },
  
 });


 export default Theme;