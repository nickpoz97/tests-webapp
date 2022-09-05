import {useParams} from "react-router-dom";
import getRisposte from "../../utils/GetRisposte";
import React, {useEffect, useState} from "react";
import {Hidden, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BigScreenResultTable from "./BigScreenResultTable";
import SmallScreenResultTable from "./SmallScreenResultTable";
import {Helmet} from 'react-helmet'


const Result = (props) => {
    const {nomeTest, dataTest, orarioTest} = useParams()

    const [result, setResult] = useState({listRisposte: [], yourScore: 0, maxScore: 0})

    var tabindex = 1;

    const getYourScore = (risposte) => {
        let yourScore = 0;
        risposte.forEach((r) => {
            yourScore += r.punteggio * r.domanda.punti
        });
        return yourScore;
    }

    const getMaxScore = (risposte) => {
        let maxScore = 0;
        risposte.forEach((r) => {
            maxScore += getScoreRispostaEsatta(r.domanda) * r.domanda.punti
        })
        return maxScore
    }

    useEffect(() => {
            getRisposte(nomeTest, dataTest, orarioTest).then(response => {
                    setResult({
                        listRisposte: getListRisposte(response),
                        yourScore: getYourScore(response),
                        maxScore: getMaxScore(response)
                    })
                }
            )
        }, []
    )

    const getListRisposte = (response) => {
        return response.map(
            item => {
                return {
                    testoDomanda: item.domanda.testo,
                    rispostaData: item.testo,
                    rispostaCorretta: getRispostaEsatta(item.domanda),
                    punteggio: `${+(item.domanda.punti * item.punteggio).toFixed(2)}
                    su
                    ${+item.domanda.punti.toFixed(2)}`
                }
            }
        )
    }

    const getRispostaEsatta = (domanda) => {
        const index = domanda.risposte.map(r => r.punteggio).indexOf(getScoreRispostaEsatta(domanda))
        return domanda.risposte[index].testo
    }

    const getScoreRispostaEsatta = (domanda) => {
        const scores = domanda.risposte.map(risposta => risposta.punteggio)
        return Math.max(...scores)
    }

    if (result.listRisposte.length === 0) {
        return null
    }

    const headerColumns = [
        'Domanda',
        'Risposta Data',
        'Risposta Corretta',
        'Punti'
    ]

    return (
        <Stack direction="column" alignItems="center" justifyContent="center">
            <Helmet>
                <title>Risultati test</title>
                <html lang="it"></html>
            </Helmet>
            <Typography tabIndex={tabindex} variant="h3" component="h1">Risultati del test</Typography>
            <Hidden smDown>
                <BigScreenResultTable indicetab={tabindex} listRisposte={result.listRisposte}
                                      headerColumns={headerColumns}/>
            </Hidden>
            <Hidden smUp>
                <SmallScreenResultTable listRisposte={result.listRisposte} headerColumns={headerColumns}/>
            </Hidden>
            <Typography
                aria-label={"Punteggio totale: " + result.yourScore.toFixed(2) + "su" + result.maxScore.toFixed(2)}
                variant="h4" component="h2" sx={{margin: 5}} tabIndex={result.listRisposte.length * 4 + 2}>
                Punteggio: {result.yourScore.toFixed(2)} su {result.maxScore.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                href="/"
            >
                Home
            </Button>
        </Stack>
    )
}

export default Result
