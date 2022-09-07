import {useLocation} from 'react-router-dom'
import React, {createRef, useEffect, useState} from 'react';
import saveAnswer from "../utils/SaveAnswer";
import Button from "@mui/material/Button";
import {FormControlLabel, Radio, RadioGroup, Stack, Typography} from "@mui/material";
import shuffleArray from "../utils/ShuffleArray";
import getRisposte from "../utils/GetRisposte";
import Box from '@mui/material/Box';
import {GlobalStyle} from '../Style/GlobalStyle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';


import {Helmet} from 'react-helmet'

const TITLE = 'COMPILA IL TEST '

const Domanda = () => {
    const location = useLocation();
    const {ordineDomande, test, numeraDomande} = location.state;
    const domande = test.domande;
    const [ready, setReady] = useState(false)
    const [status, setStatus] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState(false)
    const [actualAnswer, setActualAnswer] = useState(undefined)

    const downloadStatus = async () => {
        getRisposte(test.nome, test.data, test.orario).then(response => {
            setStatus(response);
        })
    }

    useEffect(() => {
            downloadStatus()
                .then(() => setReady(true))
                .catch(error => alert(error.message))
        }, []
    )

    const [index, setIndex] = useState(0);
    let newQuestionRef = createRef()

    var flag = false;
    useEffect(() => {
        setActualAnswer(undefined);
        window.scrollTo({top: 0, behavior: "smooth"})
        if(newQuestionRef.current) {
            newQuestionRef.current.tabIndex = "-1"
            newQuestionRef.current.focus()
        }
    }, [index])

    var numRisp = 0;

    // shuffle only once
    useEffect(() => {
        if (test.ordineCasuale) {
            shuffleArray(domande)
        }

        for (var i = 0; i < domande.length; i++) {
            if (domande[i].ordineCasuale) {
                shuffleArray(domande[i].risposte)
            }
        }
    }, [])

    function RenderNumRisp(props) {
        if (props.risposteConNumero) {
            return <Typography sx={{display: "inline"}} variant="body1">{++numRisp + ") "}</Typography>;
        }
    }

    function RenderAccessibilityInstruction(props) {
        if (flag === false) {
            flag = true;
            console.log(flag);
            return (<Typography sx={GlobalStyle.accessibilityInstruction}>Naviga le risposte con tasti
                freccia</Typography>);
        }
    }

    function RenderNumDom(props) {
        if (props.domandeConNumero)
            return (<Box tabIndex={0}><br></br><Typography variant='h3' sx={{marginBottom: "2%"}}><u>Domanda
                n° {index + 1}</u></Typography></Box>);
    }

    const waitForSave = async (fun) => {
        setDisabledButtons(true)
        const success = await storeAnswer()

        if (success) {
            fun()
        } else {
            alert("impossibile salvare, autenticarsi di nuovo tra qualche minuto")
        }

        setDisabledButtons(false)
    }

    const increment = () => {
        waitForSave(() => setIndex(index + 1))
    }

    const decrement = () => {
        waitForSave(() => setIndex(index - 1));
    }

    const showResults = (e) => {
        waitForSave(
            () => {
                if (status.length + (actualAnswer !== undefined) >= domande.length) {
                    window.open(e.target.name, "_self")
                } else {
                    alert("Rispondere a tutte le domande prima di concludere")
                }
            }
        )
    }

    const storeAnswer = async () => {
        const variables = {
            nomeTest: test.nome,
            orarioTest: test.orario,
            dataTest: test.data,
            idRisposta: actualAnswer,
            nomeDomanda: domande[ordineDomande[index] - 1].nome
        }

        let success = true
        if (actualAnswer) {
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
                name="bottone_avanti"
                tabIndex={0}
            >
                Avanti
                <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
        )
    }

    const RightButton = () => {
        return (index === domande.length - 1 ? <EndButton></EndButton> : <NextButton></NextButton>);
    }

    if (!ready) {
        return <div></div>
    }


    return (
        <Box>
            <Helmet>
                <title>{TITLE + test.nome}</title>
                <html lang="it"></html>
            </Helmet>
            <Box sx={GlobalStyle.divDomanda}>
                <Typography name="nome_test" variant='h2' fontWeight="bold" tabIndex={0}><u>Nome test</u>: {test.nome}
                </Typography>
                <Box sx={GlobalStyle.divDomanda2} name="box_domonda">
                    <RenderNumDom domandeConNumero={numeraDomande}></RenderNumDom><i>
                    <Box display="inline" tabIndex={0} ref={newQuestionRef}><Typography display="inline" sx={GlobalStyle.nomeDomanda}
                                                                   variant='h4' name="nome_domanda"><u>Nome
                        domanda</u>: {domande[ordineDomande[index] - 1].nome}</Typography></Box><Typography tabIndex={0}
                                                                                                            display="inline"
                                                                                                            variant='h4'
                                                                                                            name="punti_domanda">({domande[ordineDomande[index] - 1].punti} punti)</Typography></i>
                    <Typography tabIndex={0} name="testo_domanda" variant='h5' sx={GlobalStyle.nomeDomanda}><u>Testo
                        domanda</u>: {domande[ordineDomande[index] - 1].testo}</Typography>
                </Box>
            </Box>
            <Box name="box_risposte" sx={GlobalStyle.divRisposte}>
                <Typography tabIndex={0} name="seleziona_risposte" variant='h3'>Seleziona una risposta:</Typography>
                <RadioGroup>
                    <p tabIndex={0} hidden={true}> Premi tab e naviga le risposte con i tasti direzionali</p>
                    {domande[ordineDomande[index] - 1].risposte.map((risposta) => (
                        <Box name={"risposta_" + risposta.id} sx={GlobalStyle.divRisposte} key={risposta.id}>
                            <RenderNumRisp
                                risposteConNumero={domande[ordineDomande[index] - 1].risposteConNumero}></RenderNumRisp>
                            <FormControlLabel
                                aria-label={risposta.testo + ",  naviga le risposte utilizzando i tasti direzionali"}
                                control={<Radio sx={GlobalStyle.AnswersRadioButton}/>}
                                label={risposta.testo}
                                name={domande[ordineDomande[index] - 1].nome}
                                onClick={() => setActualAnswer(risposta.id)}
                                checked={
                                    actualAnswer ? (actualAnswer === risposta.id) : status.map(r => r.id).includes(parseInt(risposta.id))
                                }
                            ></FormControlLabel>
                        </Box>
                    ))}
                </RadioGroup>
            </Box>
            <br></br>
            <Stack direction="row" justifyContent="space-evenly">
                <Button name="bottone_indietro" variant="contained" disabled={index === 0 || disabledButtons}
                        onClick={decrement}><ArrowBackIcon></ArrowBackIcon>Indietro</Button>
                <RightButton></RightButton>
            </Stack>
            <Stack sx={{margin: "20px"}} direction="row" justifyContent="center">
                <Button
                    variant="contained"
                    href="/"
                    color="secondary"
                >
                    <HomeIcon></HomeIcon>
                    home 
                </Button>
            </Stack>
        </Box>
    )
}

export default Domanda;