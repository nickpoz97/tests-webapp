import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const ResultHeader = (props) => {
    return(
        <TableHead>
            <TableRow>
                {props.headerColumns.map(colName => <TableCell key={colName}><Typography variant="body1">{colName}</Typography></TableCell>)}
            </TableRow>
        </TableHead>
    )
}

const ResultBody = (props) => {
    return(
        <TableBody>
            {
                props.listRisposte.map(
                    (risposta, index) =>
                        <TableRow key={index}>
                            <TableCell>{risposta.testoDomanda} </TableCell>
                            <TableCell>{risposta.rispostaData}</TableCell>
                            <TableCell>{risposta.rispostaCorretta}</TableCell>
                            <TableCell>{risposta.punteggio}</TableCell>
                        </TableRow>
                )
            }
        </TableBody>
    )
}

const BigScreenResultTable = (props) => {
    return (
        <TableContainer>
            <Table stickyHeader >
                <ResultHeader headerColumns={props.headerColumns} />
                <ResultBody listRisposte={props.listRisposte}/>
            </Table>
        </TableContainer>
    )
}

export default BigScreenResultTable