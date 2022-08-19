import React, {useState} from "react";
import styles from "../style.module.css";
import InsertQuestion from "./InsertQuestion";


const CreaDomanda = () =>{
    const[submitted, setSubmitted] = useState(false);
    const[numRisposte, setNumRisposte] = useState(2);
    const[query, setQuery] = useState("");
    const[domanda, setDomanda] = useState({
        nome: "",
        testo: "",
        punti: 0,
        ordineCasuale: false,
        risposteConNumero: false,
    });
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
            return <InsertQuestion post={query}/>;
        }
        else{
            return <div></div>
        }
    }

    function costruisciStringaRisposte(arrayRisposte){
        var stringaRisposte = '[';
        for(var i = 0; i<arrayRisposte.length; i++){
            stringaRisposte+='{ testo: "'+arrayRisposte[i].testo+'" punteggio: ' + arrayRisposte[i].punti + '}';
            if(i<arrayRisposte.length-1){
                stringaRisposte+=',';
            }
        }
        stringaRisposte+=']'
        return stringaRisposte;
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        var nome_domanda = document.getElementById("nome_domanda").value;
        var testo_domanda = document.getElementById("testo_domanda").value;
        var punti_domanda = document.getElementById("punti_domanda").value;
        var ordineCasuale = document.getElementById("ordineCasuale").checked;
        var risposteConNumero = document.getElementById("risposteConNumero").checked;

        var domanda = {
            nome: nome_domanda,
            testo: testo_domanda,
            punti: parseInt(punti_domanda),
            ordineCasuale: ordineCasuale,
            risposteConNumero: risposteConNumero,
        };


        setDomanda(domanda);

        for(var i=0; i<arrayRisposte.length; i++){
            arrayRisposte[i].testo = document.getElementById("risposta"+(i+1)).value
            arrayRisposte[i].punti = document.getElementById("punti"+(i+1)).value
        }

        setArrayRisposte(arrayRisposte);
        var stringaRisposte = costruisciStringaRisposte(arrayRisposte);

        var insertDomandaQuery = `
            mutation{
                addDomanda(
                    domandaInput:{
                        nome: "`+domanda.nome+`"
                        testo: "`+domanda.testo+`"
                        punti: `+domanda.punti+`
                        ordineCasuale: `+domanda.ordineCasuale+`
                        risposteConNumero: `+domanda.risposteConNumero+`
                        risposte: `+stringaRisposte+`
                    }
                ){
                    success
                    message
                }
            }
        `

        setQuery(insertDomandaQuery);
        //console.log(insertDomandaQuery);

        RenderInsertQuestion();
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
                    <label for="ordineCasuale">Risposte in ordine casuale</label>
                    <input id="risposteConNumero" name="risposteConNumero" type="checkbox"></input>
                    <label for="risposteConNumero">Risposte con numero</label><br></br><br></br>
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
                <RenderInsertQuestion/>
            </div>
        </div>
    )
}

export default CreaDomanda;