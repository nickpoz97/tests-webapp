import {Link, useLocation} from 'react-router-dom'
import styles from "../style.module.css";
import React, {useEffect, useState} from 'react';
import saveAnswer from "../utils/SaveAnswer";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import shuffleArray from "../utils/ShuffleArray";

const Domanda = () =>{
  
  const location = useLocation()
  const {ordineDomande, test, numeraDomande} = location.state;
  const domande = test.domande

  console.log(test)

  const [index, setIndex] = useState(0);

  var actualAnswer;
  useEffect(() => {
      actualAnswer = undefined;
  }, [index])

  var numRisp = 0;
  var numDomande = 0;

  if(test.ordineCasuale){
      shuffleArray(domande)
  }

  for(var i = 0; i<domande.length; i++){
    if(domande[i].ordineCasuale) {
        shuffleArray(domande[i].risposte)
    }
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
      saveAnswer(variables)
  }

  const EndButton = () => {
      return (
          <Link className={styles.LinkButton} to={`/result/${test.nome}/${test.data}+${test.orario}`} state={{test: test}}>
              <Button
                  variant="contained"
                  color="success"
                  onClick={() => {}}
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
              <input className={styles.rispostaRadio} onClick={() => {actualAnswer = (risposta.id)}} name={domande[ordineDomande[index]-1]} type="radio" value={risposta.testo}></input>
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