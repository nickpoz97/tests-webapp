import React, {useState} from "react";
import styles from "../style.module.css";
import addDomanda from "../utils/AddDomanda";
import Typography from "@mui/material/Typography";
import {Alert, FormControlLabel, Stack, TextField} from "@mui/material";
import {GlobalStyle} from '../Style/GlobalStyle'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from "@mui/material/Checkbox";


const CreaDomanda = () =>{
    const [arrayRisposte, setArrayRisposte] = useState([])
    const [result, setResult] = useState(<></>)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        for(var i=0; i<arrayRisposte.length; i++){
            arrayRisposte[i].testo = document.getElementById("risposta"+(i+1)).value
            arrayRisposte[i].punteggio = document.getElementById("punti"+(i+1)).value
        }

        const domandaInput = {
            nome: document.getElementById("nome_domanda").value,
            testo: document.getElementById("testo_domanda").value,
            punti: document.getElementById("punti_domanda").value,
            ordineCasuale: document.getElementById("ordineCasuale").checked,
            risposteConNumero: document.getElementById("risposteConNumero").checked,
            risposte: arrayRisposte.map(r => ({testo: r.testo, punteggio: r.punteggio}))
        }

        RenderInsertQuestion(domandaInput);
    }

    function RenderInsertQuestion(domandaInput){
        if(arrayRisposte.length < 2){
            setResult(
                <Box>
                    <Alert severity="warning">Devono esserci almeno 2 risposte</Alert>
                </Box>
            )
            return
        }

        console.log(arrayRisposte.map(r => parseInt(r.punteggio)))
        if (arrayRisposte.find(r => parseInt(r.punteggio) === 1) === undefined){
            setResult(
                <Box>
                    <Alert severity="warning">Deve esserci almeno una risposta con punteggio 1</Alert>
                </Box>
            )
            return
        }
        addDomanda(domandaInput).then(result => {
            if(result){
                setResult(
                    <Box>
                        <Alert severity="success">Inserimento avvenuto con successo</Alert>
                    </Box>
                )
            }
            else{
                setResult(
                    <Box>
                        <Alert severity="error">Errore Inserimento</Alert>
                    </Box>
                )
            }
        });
    }

    function aggiungiRisposta(){
        const risposta = {
            numero: arrayRisposte.length+1,
            testo: "",
            punti: 0,
            domanda: ""
        };
        setArrayRisposte([...arrayRisposte, risposta]);
    }

    function rimuoviRisposta(risposta){
        var array = [...arrayRisposte];
        var index = array.indexOf(risposta)
        array.splice(index, 1);
        setArrayRisposte(array);
    }

    function EmptyList(){
        if(arrayRisposte.length < 2){
            return(<Alert severity="info">Inserire almeno 2 risposte</Alert>)
        }
    }

    return(
        <Box>
            <Box className={styles.divDomanda}>
            <Typography className="headerCreate" variant="h3">Crea una domanda:</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={GlobalStyle.formCreate}>
                        <TextField required id="nome_domanda" label="Nome domanda" variant="outlined" />
                    </Box>
                    <Box sx={GlobalStyle.formCreate}>
                        <TextField className="formCreate" required id="testo_domanda" label="Testo domanda" variant="outlined" />
                    </Box>
                    <Box sx={GlobalStyle.formCreate}>
                        <TextField type="number" className="formCreate" required id="punti_domanda" label="Punti domanda" variant="outlined" />
                    </Box>
                    <Typography sx={GlobalStyle.headerCreate} variant="h3">Aggiungi risposte:</Typography>
                    <Box>
                    <FormControlLabel
                        control={<CheckBox id="ordineCasuale" name="ordineCasuale"/>}
                        label="Risposte in ordine casuale"
                    />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<CheckBox id="risposteConNumero" name="risposteConNumero"/>}
                            label="Risposte con numero"
                        />
                    </Box>
                    <Box sx={{margin: "20px"}}>
                        <EmptyList/>
                    </Box>
                    {arrayRisposte.map((risposta) => (
                    //inzio componente domanda 
                    <Stack direction="row">
                        <TextField sx={GlobalStyle.formCreate} required id={"risposta" + risposta.numero} label="Testo risposta" variant="outlined" />
                        <TextField type="number" sx={GlobalStyle.formCreate} required id={"punti" + risposta.numero} label="Punti risposta" variant="outlined" />
                        <Stack sx={GlobalStyle.formCreate} direction="column" justifyContent="center">
                        <Button className="rimuovi" onClick={() => { rimuoviRisposta(risposta) }} variant="outlined" startIcon={<DeleteIcon />}>
                            Rimuovi
                        </Button>
                        </Stack>
                    </Stack>
                    //fine componente domanda 
                    ))}
                    <Box textAlign='center'>
                        <Button sx={GlobalStyle.addButton} variant="contained" onClick={aggiungiRisposta} color="primary">Aggiungi Risposta</Button>
                    </Box>
                    <Box textAlign='center'>
                        <Button sx={GlobalStyle.submitButton} type="submit" variant="contained" color="success">Crea Domanda</Button>
                    </Box>
                </form>
                {result}
            </Box>
        </Box>
    )
}

export default CreaDomanda;