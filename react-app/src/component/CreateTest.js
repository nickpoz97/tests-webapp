import Appbar from "./Appbar";
import { useQuery } from 'react-query'
import styles from "../style.module.css";
import { useState } from 'react';

import React from "react";

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

function getToday(){
  var date = new Date();
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');;
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

  function deleteDomanda(domanda){
    var array = [...arrayDomande];
    console.log(array);
    var index = array.indexOf(domanda)
    array.splice(index, 1);
    setArrayDomande(array);
  }

  function printButtonCheck(){
    if(arrayDomande.length>0)
      return(
        <div>
          <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
          <label for="ordineCasuale">Ordine casuale</label>
          <br></br>
          <input id="domandeConNumero" name="domandeConNumero" type="checkbox"></input>
          <label for="domandeConNumero">Domande con numero</label>
          <br></br><br></br>
          <button id="creaTest" className={styles.creaTestButton} onClick={creaTest}>Crea Test</button>
        </div>
      );
  }

  function creaTest(){
    var bottone = document.getElementById("creaTest");
    var nome_test = document.getElementById("nome_test");
    var data = document.getElementById("data");
    var ora = document.getElementById("ora");
    var ordine_casuale = document.getElementById("ordineCasuale");
    var domande_con_numero = document.getElementById("domandeConNumero");

    var domande_string = "";
    for(var i=0; i<arrayDomande.length; i++){
      domande_string += '"'+arrayDomande[i].id+'",';
    }

    bottone.addEventListener("click", function() {
      const ADD_TEST_QUERY = `
        mutation{
          addTest(
              testInput: {
                  giornoDelMese:`+ data.value.split("-")[2] +`,
                  mese: `+ data.value.split("-")[2] +`,
                  anno: `+ data.value.split("-")[0] +`,
                  ora: `+ ora.value.split(":")[0] +`,
                  minuto: `+ ora.value.split(":")[1] +`,
                  nome:"`+ nome_test.value +`",
                  ordineCasuale: `+ ordine_casuale.checked +`,
                  domandeConNumero:  `+ domande_con_numero.checked +`,
                  nomeDomande: [
                    `+ domande_string +`
                  ]
              }
          ){
              success
          }
        }
        `;
        ExecuteQuery(ADD_TEST_QUERY)
    })    
  }

  const ExecuteQuery = (testToAdd) =>{
    console.log(testToAdd);
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
        Nome Test: <input id="nome_test" type="text"/> <br></br><br></br>
        Data: <input id="data" type="date" value={getToday()}/>  <br></br><br></br>
        Ora: <input id="ora" value={getOrario()}/>
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
          <div>{printButtonCheck()}</div>
        </div>
       </div>
    </div>
  )
}

export default CreateTest;