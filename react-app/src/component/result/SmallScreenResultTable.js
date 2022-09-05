import {
    Dialog,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const SmallScreenResultTable = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [answerToDisplayIndex, setAnswerToDisplayIndex] = useState(0)

    return (
        <>
            <TableContainer>
                <Table stickyHeader align="center">
                    <ResultHeader headerColumns={props.headerColumns}/>
                    <ResultBody
                        listRisposte={props.listRisposte}
                        headerColumns={props.headerColumns}
                        setOpen={setOpenDialog}
                        setAnswerToDisplayIndex={setAnswerToDisplayIndex}
                    />
                </Table>
            </TableContainer>
            <ResultDialog
                open={openDialog}
                setOpen={setOpenDialog}
                listRisposte={props.listRisposte}
                headerColumns={props.headerColumns}
                answerToDisplayIndex={answerToDisplayIndex}
            />
        </>
    )
}

const ResultHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center"><Typography variant="h5">Seleziona una domanda per ulteriori
                    dettagli</Typography></TableCell>
            </TableRow>
        </TableHead>
    )
}

const ResultBody = (props) => {
    return (
        <TableBody>
            {
                props.listRisposte.map(
                    (risposta, index) =>
                        <TableRow value={index} key={index}
                                  onClick={() => {
                                      props.setAnswerToDisplayIndex(index);
                                      props.setOpen(true)
                                  }}>
                            <TableCell align="center">
                                <Typography variant="h6">
                                    {risposta.testoDomanda}
                                </Typography>
                            </TableCell>
                        </TableRow>
                )
            }
        </TableBody>
    )
}

const ResultDialog = (props) => {
    const rispostaEntries = Object.entries(props.listRisposte[props.answerToDisplayIndex])

    return (
        <Dialog
            fullScreen
            open={props.open}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => props.setOpen(false)}
                    aria-label="close"
                >
                    <CloseIcon/>
                </IconButton>
            </Toolbar>
            <List>
                {
                    props.headerColumns.map((col, index) =>
                        <ListItem key={index}>
                            <Box width="100%">
                                <Paper sx={{padding: 1}} elevation={10}>
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{col}</Typography>
                                    <Typography variant="body1">{rispostaEntries[index][1]}</Typography>
                                </Paper>
                            </Box>
                        </ListItem>
                    )
                }
            </List>
        </Dialog>
    )
}

export default SmallScreenResultTable
