import Appbar from "./Appbar";
import { useLocation } from 'react-router-dom'
import styles from "../style.module.css";
import { useState } from 'react';
import React from "react";
import { style } from "@mui/system";

const DOMANDE_QUERY = `
    query {
      getAllDomande {
          nome
          testo
          punti
          ordineCasuale
          risposteConNumero
          risposte{
              id
              testo
          }
      }
    }
    `;


function getOrario(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

const CreateTest = () =>{
  const [arrayDomande, setArrayDomande] = useState([]);

  function addDomanda(){
    var e = document.getElementById("selectDomande");
    var value = e.value;
    var id = e.options[e.selectedIndex].id;
    var text = e.options[e.selectedIndex].text;

    const domanda = {
      id: id,
      testo: text,
    };

    var flag = 0;

    if(arrayDomande.length == 0){
      setArrayDomande([...arrayDomande, domanda]);
    }
    else{
      for(var i = 0; i<arrayDomande.length; i++){
       if(arrayDomande[i].id == id){
        flag = 1
        break;
       }
      }
      if(flag ==1){
        alert("Domanda già inserita");
      }
      else{
        setArrayDomande([...arrayDomande, domanda]);
      }
    }
  }

  function deleteDomanda(e){
    var array = [...this.state.arrayDomande]; // make a separate copy of the array
    var index = array.indexOf(e.target.value)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({arrayDomande: array});
    }
  }

  const [domande, setDomande] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: DOMANDE_QUERY})
        }).then(response => response.json())
        .then(data => setDomande(data.data.getAllDomande))
    },[]); 
  return(
    <div>
       <Appbar></Appbar>
       <div className={styles.divDomanda}>
        <h1>Creazione Test</h1>
        Nome Test: <input type="text"/> <br></br><br></br>
        Data: <input type="date"/>  <br></br><br></br>
        Ora: <input type="text" placeholder={getOrario()}/>
       </div>
       <div className={styles.divDomanda}>
        <h2>Lista Domande</h2>
        <div>
          <select id="selectDomande" className={styles.listaDomande} >
            {domande.map((domanda) => (
              <option key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}</option>
            ))}
          </select>
          <tab className={styles.tab}></tab>
          <button className={styles.createTestButton} onClick={addDomanda}>Aggiungi</button>
        </div>
       </div>

       <div className={styles.divDomanda}>
        <h2>Domande aggiunte</h2>
        <div>
          <ol>
            {arrayDomande.map((domanda) => (
              <li className={styles.liCreateTest} key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo} <button className={styles.rimuoviCreateTest} onClick={() => { deleteDomanda(domanda) }}>Rimuovi</button></li>
            ))}
          </ol>
        </div>
       </div>
    </div>
  )
}

export default CreateTest;