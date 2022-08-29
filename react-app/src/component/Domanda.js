import {useLocation} from 'react-router-dom'
import styles from "../style.module.css";
import React, {useEffect, useState} from 'react';
import saveAnswer from "../utils/SaveAnswer";
import Button from "@mui/material/Button";
import {Stack, Typography} from "@mui/material";
import shuffleArray from "../utils/ShuffleArray";
import getRisposte from "../utils/GetRisposte";
import Box from '@mui/material/Box';
import {GlobalStyle} from '../Style/GlobalStyle'



const Domanda = () =>{
  
  const location = useLocation();
  const {ordineDomande, test, numeraDomande} = location.state;
  const domande = test.domande;
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState([]);

    useEffect( () => {
            getRisposte(test.nome, test.data, test.orario).then(response => {
                setStatus(response);
                setReady(true)
            })
        }, [ready]
    )

  const [index, setIndex] = useState(0);

  let actualAnswer;

  useEffect(() => {
      actualAnswer = undefined;
  }, [index])

  var numRisp = 0;
  var numDomande = 0;

  // shuffle only once
  useEffect( () => {
      if(test.ordineCasuale){
          shuffleArray(domande)
      }

      for(var i = 0; i<domande.length; i++){
          if(domande[i].ordineCasuale) {
              shuffleArray(domande[i].risposte)
          }
      }
  }, [])

  function RenderNumRisp(props){
    if(props.risposteConNumero){
      return ++numRisp + ")";
    }
  }

  function RenderNumDom(props){
      if(props.domandeConNumero)
        return (<u><Typography variant='h3'>Domanda n° {++numDomande} </Typography></u>);
  }

  const changeIndex = async (newIndex) => {
    if (actualAnswer !== undefined){
        storeAnswer().then((success) => {
            if (success) {
                setIndex(newIndex)
                setReady(false)
            }
        });
    }
    else{
        setIndex(newIndex)
        setReady(false)
    }
  }

  const increment = () => {
    changeIndex(index+1)
  }

  const decrement = () => {
    changeIndex(index-1);
  }

  const showResults = (e) =>{
      const openResultPage = () => window.open(e.target.name, "_self")

      if (actualAnswer) {
          storeAnswer().then(() => openResultPage());
          return
      }

      openResultPage();
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
              variant="contained"
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

  if (!ready){
      return <div></div>
  }

  return(
    <div>
       <Box sx={GlobalStyle.divDomanda}>
          <Typography variant='h2' fontWeight="bold">{test.nome}</Typography>
          <RenderNumDom domandeConNumero={domande[ordineDomande[index]-1].risposteConNumero}/><i>
            <Typography sx={GlobalStyle.nomeDomanda} variant='h4'>{domande[ordineDomande[index]-1].nome}({domande[ordineDomande[index]-1].punti} punti)</Typography></i> 
          <Typography variant='h5' sx={GlobalStyle.nomeDomanda}>{domande[ordineDomande[index]-1].testo}</Typography>
          <h4></h4>
       </Box>
       <Box sx={GlobalStyle.divRisposte}>
          <Typography variant='h3'>Seleziona una risposta:</Typography>
          {domande[ordineDomande[index]-1].risposte.map((risposta) => (
            <Box sx={GlobalStyle.divRisposte} key={risposta.id}>
              <RenderNumRisp risposteConNumero={domande[ordineDomande[index]-1].risposteConNumero}/>
                <input
                  className={styles.rispostaRadio}
                  onClick={() => {actualAnswer = (risposta.id)}}
                  name={domande[ordineDomande[index]-1]}
                  type="radio"
                  value={risposta.testo}
                  defaultChecked={status.map(r => r.id).includes(parseInt(risposta.id))}
                  alt="seleziona risposta"
                  >
                </input>
              <label className={styles.rispostaLabel}>{risposta.testo}</label>
            </Box>
          ))}
       </Box>
       <br/>
       <Stack direction="row" justifyContent="space-evenly">
          <Button variant="contained" disabled={index === 0} onClick={decrement}>Indietro</Button>
           <RightButton />
       </Stack>
    </div>
  )
}

export default Domanda;