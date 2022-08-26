import {useLocation} from 'react-router-dom'
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
  
  const changeIndex = async (newIndex) => {
    if (actualAnswer !== undefined){
        storeAnswer().then((success) => {
            if (success) {
                setIndex(newIndex)
            }
        });
    }
  }

  const increment = () => {
    changeIndex(index+1)
  }

  const decrement = () => {
    changeIndex(index-1);
  }

  const showResults = (e) =>{
      storeAnswer().then(() => window.open(e.target.name, "_self"))
  }

  const storeAnswer = () => {
      const variables = {
          nomeTest: test.nome,
          orarioTest: test.orario,
          dataTest: test.data,
          idRisposta: actualAnswer,
          nomeDomanda: domande[ordineDomande[index]-1].nome
      }
      return saveAnswer(variables)
  }

  const EndButton = () => {
      return (
              <Button
                  variant="contained"
                  color="success"
                  name={`/result/${test.nome}/${test.data}/${test.orario}`}
                  onClick={showResults}
              >
                      Concludi
              </Button>
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