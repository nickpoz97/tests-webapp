import {Link, useLocation} from 'react-router-dom'
import styles from "../style.module.css";
import React, {useEffect, useState} from 'react';
import saveAnswer from "../utils/SaveAnswer";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";

const Domanda = () =>{
  
  const location = useLocation()
  const {ordineDomande, domande, test, numeraDomande} = location.state;

  const [index, setIndex] = useState(0);

  var actualAnswer;
  useEffect(() => {
      actualAnswer = undefined;
  }, [index])

  var numRisp = 0;
  var numDomande = 0;

  var numeri_prog = [];

  for(var i = 0; i<domande.length; i++){
      // TODO check if external posizioni array influences behavior
    var posizioni = [];

    if(domande[i].ordineCasuale){
      for(var j=0; j<domande[i].risposte.length; j++){
        posizioni.push(-1);
        numeri_prog.push(j)
      }
      var j = 0
      while(j<domande[i].risposte.length){
        var posRandom = Math.floor(Math.random() * (domande[i].risposte.length));
        if(posizioni[posRandom] === -1){
          posizioni[posRandom] = numeri_prog[j];
          j++;
        }
      }
    }
    else{
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
    storeAnswer();
    setIndex(index+1);
  }

  const decrement = (e) => {
    storeAnswer();
    setIndex(index-1);
  }

  const storeAnswer = () => {
      if (actualAnswer === undefined){
          return
      }

      const variables = {
          nomeTest: test.nome,
          orarioTest: test.orario,
          dataTest: test.data,
          idRisposta: actualAnswer,
          nomeDomanda: domande[ordineDomande[index]-1].nome
      }
      //console.log(variables.nomeDomanda)
      saveAnswer(variables).then(info => console.log(info))
  }

  const EndButton = () => {
      return (
          <Link to={`/result/${test.nome}/${test.data}+${test.orario}`} state={{test: test}}>
              <Button
                  variant="contained"
                  color="success"
                  onClick={() => {}}
                  className={styles.LinkButton}
              >
                      Concludi
              </Button>
          </Link>
      )
  }

  const NextButton = () => {
      return (
          <Button
              variant="outlined"
              color="primary"
              onClick={increment}
          >
              Avanti
          </Button>
      )
  }

  const RightButton = () => {
      return (index === domande.length -1 ? <EndButton /> : <NextButton />);
  }

  return(
    <div>
       <div className={styles.divDomanda}>
          <h1>{test.nome}</h1>
          <RenderNumDom domandeConNumero={domande[ordineDomande[index]-1].risposteConNumero}/><h2>{domande[ordineDomande[index]-1].nome}({domande[ordineDomande[index]-1].punti} punti)</h2>
          <h3>{domande[ordineDomande[index]-1].testo}</h3>
          <h4></h4>
       </div>
       <div className={styles.divRisposte}>
          {domande[ordineDomande[index]-1].risposte.map((risposta) => (
            <div className="styles.divRisposte" key={risposta.id}>
              <RenderNumRisp risposteConNumero={domande[ordineDomande[index]-1].risposteConNumero}/>
              <input className={styles.rispostaRadio} onClick={() => {actualAnswer = (risposta.id)}} name={domande[ordineDomande[index]-1]} type="radio" key={risposta.id} value={risposta.testo}></input>
              <label className={styles.rispostaLabel}>{risposta.testo}</label>
            </div>
          ))}
       </div>
       <Stack direction="row" justifyContent="space-evenly">
          <Button variant="outlined" className={styles.bottoneDomanda} disabled={index === 0} onClick={decrement}>Indietro</Button>
           <RightButton />
       </Stack>
    </div>
  )
}

export default Domanda;