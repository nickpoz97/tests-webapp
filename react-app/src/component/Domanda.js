import {useLocation} from 'react-router-dom'
import styles from "../style.module.css";
import React, {useEffect, useState} from 'react';
import saveAnswer from "../utils/SaveAnswer";
import Button from "@mui/material/Button";
import {FormControlLabel, Radio, RadioGroup, Stack, Typography} from "@mui/material";
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
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [actualAnswer, setActualAnswer] = useState(undefined)

    const downloadStatus = () => {
        getRisposte(test.nome, test.data, test.orario).then(response => {
            setStatus(response);
        })
    }

    useEffect( () => {
            getRisposte(test.nome, test.data, test.orario).then(response => {
                setStatus(response);
            })
            .then(() => setReady(true))
            .catch(error => alert(error.message))
        }, []
    )

  const [index, setIndex] = useState(0);

  useEffect(() => {
      setActualAnswer(undefined);
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

    const waitForSave = async (fun) => {
    setDisabledButtons(true)
    const success = await storeAnswer()

    if (success){
        fun()
    }
    else{
        alert("impossibile salvare, autenticarsi di nuovo tra qualche minuto")
    }

    setDisabledButtons(false)
    }

  const increment = () => {
    waitForSave(() => setIndex(index+1))
  }

  const decrement = () => {
    waitForSave(() => setIndex(index-1));
  }

  const showResults = (e) =>{
    waitForSave(() => window.open(e.target.name, "_self"))
  }

  const storeAnswer = async () => {
      const variables = {
          nomeTest: test.nome,
          orarioTest: test.orario,
          dataTest: test.data,
          idRisposta: actualAnswer,
          nomeDomanda: domande[ordineDomande[index]-1].nome
      }

      let success = true
      if(actualAnswer){
          success = await saveAnswer(variables).then((result) => result.success).catch(() => false)
          await downloadStatus()
      }

      return success
  }

  const EndButton = () => {
      return (
              <Button
                  variant="contained"
                  color="success"
                  name={`/result/${test.nome}/${test.data}/${test.orario}`}
                  onClick={showResults}
                  disabled={disabledButtons}
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
              disabled={disabledButtons}
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
           <RadioGroup >
          {domande[ordineDomande[index]-1].risposte.map((risposta) => (
            <Box sx={GlobalStyle.divRisposte} key={risposta.id}>
              <RenderNumRisp risposteConNumero={domande[ordineDomande[index]-1].risposteConNumero}/>
                <FormControlLabel
                    control={<Radio/>}
                    label={risposta.testo}
                    name={domande[ordineDomande[index]-1]}
                    value={risposta.testo}
                    onClick={() => setActualAnswer(risposta.id)}
                    checked={
                        actualAnswer ? (actualAnswer === risposta.id) : status.map(r => r.id).includes(parseInt(risposta.id))
                    }
                />
            </Box>
          ))}
           </RadioGroup>
       </Box>
       <br/>
       <Stack direction="row" justifyContent="space-evenly">
          <Button variant="contained" disabled={index === 0 || disabledButtons} onClick={decrement}>Indietro</Button>
           <RightButton />
       </Stack>
    </div>
  )
}

export default Domanda;