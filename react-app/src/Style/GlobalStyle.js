// globalStyles.js
import { createGlobalStyle } from 'styled-components';
import {createTheme, responsiveFontSizes} from "@mui/material";
 
const GlobalStyle = {
  testTableHead: {
    fontSize: "2.0em"
  },

  testTableContent: {
    fontSize: "1.8em"
  },

  h1Test: {
    fontSize: "5em",
    margin: "2%"
  },

  headerCreate: {
    marginBottom: "2%"
  },

  formCreate: {
    margin: "2%"
  },

  listaDomande: {
    width: "50%",
    fontSize: "1.5em"
  },

  submitButton: {
    fontSize: "1.5em",
    marginTop: "5%",
    backgroundColor: "#46b74b"
  },

  addButton: {
    fontSize: "1.5em",
    marginTop: "5%",
    backgroundColor: "#446bc2"
  },

  rimuovi: {
    height: "55px",
    margin: "2%",
    color: "red",
    borderColor: "red"
  },

  checkBox: {
    marginLeft: "1%",
    fontSize: "1.5em"
  },

  divCheckBox: {
    marginTop: "4%"
  }
};

const ResponsiveTheme = responsiveFontSizes(createTheme());

// ResponsiveTheme.typography.h1 = {
//     fontSize: '5em',
//     [ResponsiveTheme.breakpoints.down('sm')]:{
//         fontSize: '2.5em'
//     }
// }

export {GlobalStyle, ResponsiveTheme};