import React, {useState} from "react";
import styles from "../style.module.css";
import addDomanda from "../utils/AddDomanda";


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

    return(
        <div>
            <div className={styles.divDomanda}>
                <h1>Crea una domanda:</h1>
                <form onSubmit={handleSubmit}>
                    <h3> Nome domanda: <input required id="nome_domanda" type="text"/> </h3>
                    <h3> Testo domanda: <input required id="testo_domanda" type="text"/> </h3>
                    <h3> Punti domanda: <input required id="punti_domanda" type="text"/> </h3>
                    <h1 className={styles.h1Risposte}>Aggiungi risposte:</h1>
                    <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
                    <label htmlFor="ordineCasuale">Risposte in ordine casuale</label>
                    <input id="risposteConNumero" name="risposteConNumero" type="checkbox"></input>
                    <label htmlFor="risposteConNumero">Risposte con numero</label><br></br><br></br>
                    {arrayRisposte.map((risposta) => (
                    //inzio componente domanda 
                        <div>
                            Testo: <input required id={"risposta" + risposta.numero} name={"risposta" + risposta.numero} ></input> <tab></tab>
                            Punti: <input required id={"punti" + risposta.numero} name={"punti" + risposta.numero} placeholder={risposta.punti}></input> <tab></tab>
                            <button type="button" onClick={() => { rimuoviRisposta(risposta) }}>Rimuovi Risposta</button><br></br><br></br><br></br>
                        </div>
                    //fine componente domanda 
                    ))}
                    <button type="button" onClick={aggiungiRisposta}>Aggiungi Risposta</button><br></br>
                    <button className={styles.creaButton} type="submit">Crea Domanda</button>
                </form>
                {result}
            </div>
        </div>
    )
}

export default CreaDomanda;