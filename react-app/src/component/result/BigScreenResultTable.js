import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";


const ResultHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                {props.headerColumns.map(colName => <TableCell key={colName}><Typography
                    variant="body1">{colName}</Typography></TableCell>)}
            </TableRow>
        </TableHead>
    )
}

const ResultBody = (props) => {
    var tabindex = props.indicetab;

    return (
        <TableBody>
            {
                props.listRisposte.map(
                    (risposta, index) =>
                        <TableRow id={"riga" + index} key={index}>
                            <TableCell tabIndex={tabindex++}
                                       aria-label={"Domanda:" + risposta.testoDomanda}>{risposta.testoDomanda} </TableCell>
                            <TableCell tabIndex={tabindex++}
                                       aria-label={"Risposta data:" + risposta.rispostaData}>{risposta.rispostaData}</TableCell>
                            <TableCell tabIndex={tabindex++}
                                       aria-label={"Risposta corretta:" + risposta.rispostaCorretta}>{risposta.rispostaCorretta}</TableCell>
                            <TableCell tabIndex={tabindex++}
                                       aria-label={"Punti:" + risposta.punteggio}>{risposta.punteggio}</TableCell>
                        </TableRow>
                )
            }
        </TableBody>
    )
}

const BigScreenResultTable = (props) => {
    var tabindex = props.indicetab;

    return (
        <TableContainer>
            <Table stickyHeader>
                <ResultHeader headerColumns={props.headerColumns}/>
                <ResultBody indicetab={tabindex} listRisposte={props.listRisposte}/>
            </Table>
        </TableContainer>
    )
}

export default BigScreenResultTable