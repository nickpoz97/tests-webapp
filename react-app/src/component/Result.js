import {Link, useParams} from "react-router-dom";
import getRisposte from "../utils/GetRisposte";
import React, {useEffect, useState} from "react";
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import styles from "../style.module.css"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Result = (props) => {
    const {nomeTest, dataTest, orarioTest} = useParams()

    const [result, setResult] = useState({listRisposte: [], yourScore: 0, maxScore: 0})

    const getYourScore = (risposte) => {
        let yourScore = 0;
        risposte.forEach((r) => {yourScore += r.punteggio * r.domanda.punti});
        return yourScore;
    }

    const getMaxScore = (risposte) => {
        let maxScore = 0;
        risposte.forEach((r) => {maxScore += getScoreRispostaEsatta(r.domanda) * r.domanda.punti})
        return maxScore
    }

    useEffect( () => {
        getRisposte(nomeTest, dataTest, orarioTest).then(answerList => {
            setResult({
                listRisposte: answerList,
                yourScore: getYourScore(answerList),
                maxScore: getMaxScore(answerList)
            })
        }
    )}, []
    )

    const getRispostaEsatta = (domanda) => {
        const index = domanda.risposte.map(r => r.punteggio).indexOf(getScoreRispostaEsatta(domanda))
        return domanda.risposte[index].testo
    }

    const getScoreRispostaEsatta = (domanda) => {
        const scores = domanda.risposte.map(risposta => risposta.punteggio)
        return Math.max(...scores)
    }

    if(result.listRisposte.length === 0){
        return null
    }

    const ResultHeader = (props) => {
       return(
           <TableHead>
           <TableRow>
               {props.headerColumns.map(colName => <TableCell key={colName}><Typography variant="body1">{colName}</Typography></TableCell>)}
           </TableRow>
           </TableHead>
       )
    }

    const headerColumns = [
        'Domanda',
        'Risposta Data',
        'Risposta Corretta',
        'Punti'
    ]

    const ResultBody = (props) => {
        return(
            <TableBody>
                {
                    props.listRisposte.map(
                        risposta =>
                            <TableRow key={risposta.id}>
                                <TableCell>{risposta.domanda.nome} </TableCell>
                                <TableCell>{risposta.testo}</TableCell>
                                <TableCell>{getRispostaEsatta(risposta.domanda)}</TableCell>
                                <TableCell>
                                    {
                                        `${+(risposta.domanda.punti * risposta.punteggio).toFixed(2)}
                                         su
                                         ${+risposta.domanda.punti.toFixed(2)}`
                                    }
                                </TableCell>
                            </TableRow>
                    )
                }
            </TableBody>
        )
    }
    return(
        <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography variant="h4" component="h1" className={styles.result}>Risultati del test</Typography>
            <TableContainer>
            <Table stickyHeader >
                <ResultHeader headerColumns={headerColumns} />
                <ResultBody listRisposte={result.listRisposte}/>
            </Table>
            </TableContainer>
            <Typography variant="h4" component="h2" sx={{margin: 5}}>
                Punteggio: {result.yourScore.toFixed(2)} su {result.maxScore.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                onClick={() => window.open("/", "_self")}
            >
                Home
            </Button>
        </Stack>
    )
}

export default Result
