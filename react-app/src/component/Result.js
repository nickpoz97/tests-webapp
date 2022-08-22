import {Link, useLocation} from "react-router-dom";
import getRisposte from "../utils/GetRisposte";
import React, {useEffect, useState} from "react";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import styles from "../style.module.css"
import Button from "@mui/material/Button";

const Result = () => {
    const location = useLocation();
    const {test} = location.state;
    const [listaRisposte, setListRisposte] = useState([])
    const [yourScore, setYourScore] = useState(0)
    const [maxScore, setMaxScore] = useState(0)

    const getYourScore = (risposte) => {
        let yourScore = 0;
        risposte.forEach((r) => {yourScore += r.punteggio});
        return yourScore;
    }

    const getMaxScore = (risposte) => {
        let maxScore = 0;
        risposte.forEach((r) => {maxScore += getScoreRispostaEsatta(r.domanda)})
        return maxScore
    }

    useEffect( () => {
        getRisposte().then(result => {
            console.log(result);
            setListRisposte(result)
            setYourScore(getYourScore(result))
            setMaxScore(getMaxScore(result))
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
                        Punti
                    </TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                        {
                            listaRisposte.map(
                                risposta =>
                                    <TableRow key={risposta.id}>
                                        <TableCell>{risposta.domanda.nome} </TableCell>
                                        <TableCell>{risposta.testo}</TableCell>
                                        <TableCell>{getRispostaEsatta(risposta.domanda)}</TableCell>
                                        <TableCell>{risposta.punteggio}</TableCell>
                                    </TableRow>)}
                </TableBody>
            </Table>
            <h2 className={styles.result}>
                Punteggio: {yourScore}/{maxScore}
            </h2>
            <Link to="/" className={styles.LinkButton}>
                <Button variant="contained" id={styles['resultHomeButton']}>Home</Button>
            </Link>
        </Stack>
    )
}

export default Result
