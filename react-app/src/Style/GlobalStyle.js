// globalStyles.js
import {createTheme, responsiveFontSizes} from "@mui/material";

const GlobalStyle = {
  testTableHead: {
    fontSize: "2.0em"
  },

  testTableContent: {
    fontSize: "1.8em"
  },

  h1Test: {
    margin: "2%"
  },

  headerCreate: {
    marginBottom: "2%"
  },

  formCreate: {
    margin: "2%"
  },

  listaDomande: {
    marginLeft: "2%",
    width: "50%",
    fontSize: "1.5em"
  },

  linkToHome: {
    textDecoration: 'none', 
    color: 'white',
  },

  divDomanda:{
    margin: "auto",
    marginTop: "2%",
    fontFamily: "Arial, Helvetica, sans-serif",
    borderCollapse: "collapse",
    width: "90%",
    backgroundColor: "#e7eeee",
    padding: "2%"
  },

  submitButton: {
    marginBottom: "20px",
    backgroundColor: "#46b74b"
  },

  addButton: {
    marginBottom: "20px",
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
  },

  divDomanda: {
    margin: "auto",
    marginTop: "2%",
    borderCollapse: "collapse",
    width: "90%",
    backgroundColor: "#baecf5",
    padding: "2%"
  },

  divDomanda2: {
    margin: "2%"
  },

  divRisposte: {
    margin: "auto",
    marginTop: "2%",
    fontFamily: ["Arial", "Helvetica", "sans-serif"],
    width: "90%",
    backgroundColor: "#acf59f",
    padding: "2%"
  },
  nomeDomanda:{
    marginTop: "2%",
  },
  AnswersRadioButton:{
    "&.MuiRadio-colorPrimary":{
      backgroundColor: "white"
    },
    "&.Mui-checked": {
      color: "black",
    },
    width:0,
    height: 0,
    marginRight: 5,
    marginLeft: 2
  },

  accessibilityInstruction:{
    ariaHidden:"true",
    position: "absolute !important"
  }
};

const ResponsiveTheme = responsiveFontSizes(
    createTheme(
{
      typography: {
        fontFamily: ["Arial", "Helvetica", "sans-serif"]
      }
    })
);

export {GlobalStyle, ResponsiveTheme};