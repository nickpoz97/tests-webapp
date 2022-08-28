import React, {useState} from "react";
import styles from "../style.module.css";
import addDomanda from "../utils/AddDomanda";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {GlobalStyle} from '../Style/GlobalStyle'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';


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
                <div>
                    <h1 className={styles.insertRispostaError}>Devono esserci almeno 2 risposte</h1>
                </div>
            )
            return
        }

        console.log(arrayRisposte.map(r => parseInt(r.punteggio)))
        if (arrayRisposte.find(r => parseInt(r.punteggio) === 1) === undefined){
            setResult(
                <div>
                    <h1 className={styles.insertRispostaError}>Deve esserci almeno una risposta con punteggio 1</h1>
                </div>
            )
            return
        }
        addDomanda(domandaInput).then(result => {
            if(result){
                setResult(
                    <div>
                        <h1 className={styles.insertTestSuccess}>Inserimento avvenuto con successo</h1>
                    </div>
                )
            }
            else{
                setResult(
                    <div><h1 className={styles.insertTestError}>Errore Inserimento</h1></div>
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
        if(arrayRisposte.length == 0){
          return(<Typography className="headerCreateTest" variant="h4" color="red">nessuna risposta inserita...</Typography>)
        }
    }

    return(
        <div>
            <GlobalStyle />
            <div className={styles.divDomanda}>
            <Typography className="headerCreate" variant="h3">Crea una domanda:</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField className="formCreate" required id="nome_domanda" label="Nome domanda" variant="outlined" /> 
                    <br/>
                    <TextField className="formCreate" required id="testo_domanda" label="Testo domanda" variant="outlined" /> 
                    <br/>
                    <TextField type="number" className="formCreate" required id="punti_domanda" label="Punti domanda" variant="outlined" /> 
                    <Typography className="headerCreate" variant="h3">Aggiungi risposte:</Typography>
                    <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
                    <label htmlFor="ordineCasuale">Risposte in ordine casuale</label>
                    <input id="risposteConNumero" name="risposteConNumero" type="checkbox"></input>
                    <label htmlFor="risposteConNumero">Risposte con numero</label><br></br><br></br>
                    <EmptyList/>
                    {arrayRisposte.map((risposta) => (
                    //inzio componente domanda 
                        <div>
                            <TextField className="formCreate" required id={"risposta" + risposta.numero} label="Testo risposta" variant="outlined" /> 
                            <TextField type="number" className="formCreate" required id={"punti" + risposta.numero} label="Punti risposta" variant="outlined" />
                            <Button className="rimuovi" onClick={() => { rimuoviRisposta(risposta) }} variant="outlined" startIcon={<DeleteIcon />}>
                                Rimuovi
                            </Button>
                        </div>
                    //fine componente domanda 
                    ))}
                    <Box textAlign='center'>
                        <Button className="addButton" variant="contained" onClick={aggiungiRisposta} color="success">Aggiungi Risposta</Button>
                    </Box>
                    <Box textAlign='center'>
                        <Button className="submitButton" type="submit" variant="contained" color="success">Crea Domanda</Button>
                    </Box>
                </form>
                {result}
            </div>
        </div>
    )
}

export default CreaDomanda;