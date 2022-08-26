import {Link, useParams} from "react-router-dom";
import getRisposte from "../utils/GetRisposte";
import React, {useEffect, useState} from "react";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import styles from "../style.module.css"
import Button from "@mui/material/Button";

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
        return <></>
    }

    return(
        <Stack direction="column" alignItems="center">
            <h1 className={styles.result}>Risultati del test</h1>
            <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Domanda
                    </TableCell>
                    <TableCell>
                        Risposta Data
                    </TableCell>
                    <TableCell>
                        Risposta Corretta
                    </TableCell>
                    <TableCell>
                        Punti Risposta Data
                    </TableCell>
                    <TableCell>
                        Punti Ottenuti
                    </TableCell>
                    <TableCell>
                        Punti Max
                    </TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                        {
                            result.listRisposte.map(
                                risposta =>
                                    <TableRow key={risposta.id}>
                                        <TableCell>{risposta.domanda.nome} </TableCell>
                                        <TableCell>{risposta.testo}</TableCell>
                                        <TableCell>{getRispostaEsatta(risposta.domanda)}</TableCell>
                                        <TableCell>{risposta.punteggio}</TableCell>
                                        <TableCell>{risposta.domanda.punti * risposta.punteggio}</TableCell>
                                        <TableCell>{risposta.domanda.punti}</TableCell>
                                    </TableRow>)
                        }
                </TableBody>
            </Table>
            <h2 className={styles.result}>
                Punteggio: {result.yourScore}/{result.maxScore}
            </h2>
            <Link to="/" className={styles.LinkButton}>
                <Button variant="contained" id={styles['resultHomeButton']}>Home</Button>
            </Link>
        </Stack>
    )
}

export default Result
