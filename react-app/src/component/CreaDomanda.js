import Appbar from "./Appbar";
import React from "react";
import styles from "../style.module.css";
import { useState } from 'react';


const CreaDomanda = () =>{
    const[submitted, setSubmitted] = useState(false);
    const[numRisposte, setNumRisposte] = useState(2);
    const [arrayRisposte, setArrayRisposte] = useState([
    {
        numero: 1,
        testo: "",
        punti: 0,
        domanda: ""
    },
    {
        numero: 2,
        testo: "",
        punti: 0,
        domanda: ""
    }
    ]);

    const risposta = {
        numero: 1,
        testo: "",
        punti: 0,
        domanda: ""
      };

    function RenderInsertQuestion(){
        var flag = 0;
        console.log(arrayRisposte);
        for(var i=0; i<arrayRisposte.length; i++){
            if(arrayRisposte[i].punti == 1){
                flag=1;
            }
        }
        if(submitted && flag == 0){
            return(
                <div>
                    <h1 className={styles.insertRispostaError}>Deve esserci almeno una risposta con punteggio 1</h1>
                </div>
            )
        }
        else if(submitted){
            return(
                <div>
                    <h1 className={styles.insertRispostaSuccess}>Ok</h1>
                </div>
            )
        }
        else{
            return <h1>Tasto non ancora schiacciato</h1>
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        setSubmitted(true);
        console.log("eccoci");
        console.log(document.getElementById("risposta"+(1)).value);

        //WORK IN PROGRESS
        for(var i=0; i<arrayRisposte.length; i++){
            arrayRisposte[i].testo = document.getElementById("risposta"+(i+1)).value
        }

        console.log(arrayRisposte);
        //qua fai un nuovo vettore di risposta e aggiorna lo stato di array domanda, così quando renderizzi è aggiornato
        RenderInsertQuestion()
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
        console.log(arrayRisposte);
    }

    return(
        <div>
            <Appbar></Appbar>
            <div className={styles.divDomanda}>
                <h1>Crea una domanda:</h1>
                <form onSubmit={handleSubmit}>
                    <h3> Nome domanda: <input required id="nome_domanda" type="text"/> </h3>
                    <h3> Testo domanda: <input required id="testo_domanda" type="text"/> </h3>
                    <h1 className={styles.h1Risposte}>Aggiungi risposte:</h1>
                    <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
                    <label for="ordineCasuale">Risposte in ordine casuale</label>
                    <input id="risposteConNumero" name="risposteConNumero" type="checkbox"></input>
                    <label for="risposteConNumero">Risposte con numero</label><br></br><br></br>
                    {arrayRisposte.map((risposta) => (
                    //inzio componente domanda 
                        <div>
                            Testo: <input id={"risposta" + risposta.numero} name={"risposta" + risposta.numero} ></input> <tab></tab>
                            Punti: <input id={"punti" + risposta.numero} name={"punti" + risposta.numero} placeholder={risposta.punti}></input> <tab></tab>
                            <button type="button" onClick={() => { rimuoviRisposta(risposta) }}>Rimuovi Risposta</button><br></br><br></br><br></br>
                        </div>
                    //fine componente domanda 
                    ))}
                    <button type="button" onClick={aggiungiRisposta}>Aggiungi Risposta</button><br></br>
                    <button className={styles.creaButton} type="submit">Crea Domanda</button>
                </form>
                <RenderInsertQuestion/>
            </div>
        </div>
    )
}

export default CreaDomanda;