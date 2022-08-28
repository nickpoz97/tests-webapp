// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  .testTableHead{
    font-size: 2.0em
  }
  .testTableContent{
    font-size: 1.8em
  }
  .h1Test{
    font-size:3em;
    margin: 2%;
  }
  .headerCreateTest{
    margin-bottom: 2%;
  }
  .submitButton{
    font-size:1.5em;
    margin-top: 5%;
    background-color: #46b74b;
  }
  .addDomandaButton{
    font-size:1.5em;
    margin-top: 5%;
    background-color: #446bc2;
  }
  .rimuoviDomanda{
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
 
export default GlobalStyle;