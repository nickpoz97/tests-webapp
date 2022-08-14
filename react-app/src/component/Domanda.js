import Appbar from "./Appbar";
import { useLocation } from 'react-router-dom'
import styles from "../style.module.css";
import { useState } from 'react';
import React from "react";
import { deepPurple } from "@mui/material/colors";


const Domanda = () =>{
  
  const location = useLocation()
  const {ordineDomande, domande, nomeTest} = location.state;

  const [index, setIndex] = useState(0);

  var ranRisposte = [];
  var arrayRisposte = [];
  
  console.log("-----------");
  for(var i = 0; i<domande.length; i++){
    var ranRisposte = [];
    if(domande[i].ordineCasuale){
      var num_risposte = domande[i].risposte.length;
      var j = 0;
      var pos;
      ranRisposte = [];
      for(var k=0; k<num_risposte; k++){
        ranRisposte.push(-1);
        arrayRisposte.push(k);
      }
      while(j<num_risposte){
        pos = Math.floor(Math.random() * (num_risposte));
        if(ranRisposte[pos] == -1){
          ranRisposte[pos] = arrayRisposte[j];
          j++;
        }
      }
    }
    else{
      for(var i=0; i<num_risposte; i++){
        ranRisposte.push(i);
      }
    }
    for(var i = 0; i< domande.length; i++){
      var newRisposte = [];
      for(var j=0; j<domande[i].risposte.length; j++){
        newRisposte.push(domande[i].risposte[ranRisposte[j]]);
      }
      domande[i].risposte = newRisposte;
    }
  }
  
  const increment = () => {
    if(index == domande.length-1){
        setIndex(0)
    }
    else{
      setIndex(index+1);
    }
  }

  const decrement = () => {
    if(index == 0){
        setIndex(domande.length-1)
    }
    else{
      setIndex(index-1);
    }
  }


  return(
    <div>
       <Appbar></Appbar>
       <div className={styles.divDomanda}>
          <h1>{nomeTest}</h1>
          <h2>{domande[ordineDomande[index]-1].nome}({domande[ordineDomande[index]-1].punti} punti)</h2>
          <h3>{domande[ordineDomande[index]-1].testo}</h3>
          <h4></h4>
       </div>
       <div className={styles.divRisposte}>
          {domande[ordineDomande[index]-1].risposte.map((risposta) => (
            <div className="styles.divRisposte">
             <input className={styles.rispostaRadio} name={domande[ordineDomande[index]-1]} type="radio" key={risposta.id} value={risposta.testo}></input>
             <label className={styles.rispostaLabel}>{risposta.testo}</label>
            </div>
          ))}
       </div>
       <div className={styles.divBottoniDomanda}>
          <button className={styles.bottoneDomanda} onClick={decrement}>Indietro</button>
          <button className={styles.bottoneDomanda} onClick={increment}>Avanti</button>
        </div>
    </div>
  )
}

export default Domanda;