// globalStyles.js
import { createGlobalStyle } from 'styled-components';
import {createTheme, responsiveFontSizes} from "@mui/material";
 
const GlobalStyle = createGlobalStyle`
  .testTableHead{
    font-size: 2.0em
  }
  .testTableContent{
    font-size: 1.8em
  }
  .h1Test{
    font-size:5em;
    margin: 2%;
  }
  .headerCreate{
    margin-bottom: 2%;
  }
  .formCreate{
    margin:2%;
  }
  .listaDomande{
    width: 50%;
    font-size: 1.5em;
  }

  .submitButton{
    font-size:1.5em;
    margin-top: 5%;
    background-color: #46b74b;
  }
  .addButton{
    font-size:1.5em;
    margin-top: 5%;
    background-color: #446bc2;
  }
  .rimuovi{
    height: 55px;
    margin:2%;
    color: red;
    border-color: red;
  }

  .checkBox{
    margin-left: 1%;
    font-size: 1.5em;
  }

  .divCheckBox{
    margin-top: 4%;
  }
`;

const ResponsiveTheme = responsiveFontSizes(createTheme());

// ResponsiveTheme.typography.h1 = {
//     fontSize: '5em',
//     [ResponsiveTheme.breakpoints.down('sm')]:{
//         fontSize: '2.5em'
//     }
// }

export {GlobalStyle, ResponsiveTheme};