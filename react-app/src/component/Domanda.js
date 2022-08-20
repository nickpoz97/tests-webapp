import {useLocation} from 'react-router-dom'
import styles from "../style.module.css";
import React, {useState} from 'react';


const Domanda = () =>{
  
  const location = useLocation()
  const {ordineDomande, domande, nomeTest, numeraDomande} = location.state;

  const [index, setIndex] = useState(0);
  var numRisp = 0;
  var numDomande = 0;

  var numeri_prog = [];

  for(var i = 0; i<domande.length; i++){
    if(domande[i].ordineCasuale){
      var posizioni = [];
      for(var j=0; j<domande[i].risposte.length; j++){
        posizioni.push(-1);
        numeri_prog.push(j)
      }
      var j = 0
      while(j<domande[i].risposte.length){
        var posRandom = Math.floor(Math.random() * (domande[i].risposte.length));
        if(posizioni[posRandom] == -1){
          posizioni[posRandom] = numeri_prog[j];
          j++;
        }
      }
    }
    else{
      var posizioni = [];
      for(var j=0; j<domande[i].risposte.length; j++){
        posizioni.push(j)
      }
    }
    var risposteOrdinate = [];
    for(var j=0; j<domande[i].risposte.length; j++){
      risposteOrdinate.push(domande[i].risposte[posizioni[j]]);
    }

    domande[i].risposte = risposteOrdinate;
    
  }

  function RenderNumRisp(props){
    if(props.risposteConNumero){
      return ++numRisp + ")";
    }
  }

  function RenderNumDom(props){
      if(props.domandeConNumero)
        return <h1>Domanda n° {++numDomande} </h1>;
  }
  
  const increment = (e) => {
    setIndex(index+1);
    e.target.disabled = false
  }

  const decrement = (e) => {
    setIndex(index-1);
  }


  return(
    <div>
       <div className={styles.divDomanda}>
          <h1>{nomeTest}</h1>
          <RenderNumDom domandeConNumero={domande[ordineDomande[index]-1].risposteConNumero}/><h2>{domande[ordineDomande[index]-1].nome}({domande[ordineDomande[index]-1].punti} punti)</h2>
          <h3>{domande[ordineDomande[index]-1].testo}</h3>
          <h4></h4>
       </div>
       <div className={styles.divRisposte}>
          {domande[ordineDomande[index]-1].risposte.map((risposta) => (
            <div className="styles.divRisposte">
              <RenderNumRisp risposteConNumero={domande[ordineDomande[index]-1].risposteConNumero}/>
              <input className={styles.rispostaRadio} name={domande[ordineDomande[index]-1]} type="radio" key={risposta.id} value={risposta.testo}></input>
              <label className={styles.rispostaLabel}>{risposta.testo}</label>
            </div>
          ))}
       </div>
       <div className={styles.divBottoniDomanda}>
          <button className={styles.bottoneDomanda} disabled={index === 0} onClick={decrement}>Indietro</button>
          <button className={styles.bottoneDomanda} disabled={index === domande.length-1} onClick={increment}>Avanti</button>
        </div>
    </div>
  )
}

export default Domanda;