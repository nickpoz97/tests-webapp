import React, {useState} from "react";
import styles from "../style.module.css";
import addDomanda from "../utils/AddDomanda";
import Typography from "@mui/material/Typography";
import {Alert, FormControlLabel, Paper, Slider, Stack, TextField} from "@mui/material";
import {GlobalStyle} from '../Style/GlobalStyle'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from "@mui/material/Checkbox";
import displayInfo from "../utils/DisplayInfo";


const CreaDomanda = () =>{
    const [arrayRisposte, setArrayRisposte] = useState([])
    const [info, setInfo] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();

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
        displayInfo(addDomanda, domandaInput).then(result => setInfo(result))
    }

    function aggiungiRisposta(){
        const risposta = {
            numero: arrayRisposte.length+1,
            testo: "",
            punteggio: 0,
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
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]+(.[0-9]{0,2})?' }}
                            className="formCreate"
                            required id="punti_domanda"
                            label="Punti domanda"
                            variant="outlined"
                            placeholder="1.00"
                            helperText="max 2 decimali"
                        />
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
                    {arrayRisposte.map((risposta, index) => (
                    //inzio componente domanda
                    <Stack
                        key={index}
                        sx={{margin: 3, padding: 3, border: 1}}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems='center'
                        justifyContent={{xs: 'center', sm: 'space-between'}}
                        spacing={2}
                    >
                        <Box>
                        <TextField
                            required id={"risposta" + risposta.numero}
                            label="Testo risposta"
                            variant="outlined"
                            onChange={(e) => {risposta.testo = e.target.value}}
                        />
                        </Box>
                        <Stack direction="column" justifyContent="center" alignItems="center"
                               width={{sm: "40%", xs: "100%"}}>
                            <Typography variant="body1">Punteggio </Typography>
                            <Slider
                                defaultValue={0.0}
                                required
                                id={"punti" + risposta.numero}
                                step={0.1}
                                min={0.0}
                                max={1.0}
                                marks
                                valueLabelDisplay="auto"
                                onChange={(e) => {risposta.punteggio = e.target.value}}
                            />
                        </Stack>
                        <Box>
                        <Button className="rimuovi" onClick={() => { rimuoviRisposta(risposta) }} variant="outlined" startIcon={<DeleteIcon />}>
                            Rimuovi
                        </Button>
                        </Box>
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
                {info}
            </Box>
        </Box>
    )
}

export default CreaDomanda;