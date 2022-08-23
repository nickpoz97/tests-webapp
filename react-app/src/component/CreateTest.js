import styles from "../style.module.css";
import React, {useState} from 'react';
import InsertTest from "./InsertTest";
import getAllDomande from "../utils/GetAllDomande";
import getAllTests from "../utils/GetAllTests";

const CreateTest = () =>{

  const [arrayDomande, setArrayDomande] = useState([]);
  const [domande, setDomande] = useState([]);
  const [tests, setTests] = useState([]);

  React.useEffect(() => {
    getAllDomande()
        .then(result => setDomande(result))

    getAllTests()
        .then(result => setTests(result))
  },[]);

  function addDomanda(){
    let e = document.getElementById("selectDomande");

    const domanda = {
      id: e.options[e.selectedIndex].id,
      testo: e.options[e.selectedIndex].value,
    };

    if (arrayDomande.map(d => d.id).includes(domanda.id)){
      alert("Domanda con lo stesso titolo già inserita");
      return;
    }

    setArrayDomande([...arrayDomande, domanda]);
  }

  function deleteDomanda(domanda){
    let array = [...arrayDomande];
    let index = array.indexOf(domanda)
    array.splice(index, 1);
    setArrayDomande(array);
  }

  const[info, setInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const testInput = {
      nome: document.getElementById("nomeTest").value,
      data: document.getElementById("data").value,
      orario: document.getElementById("ora").value,
      ordineCasuale: document.getElementById("ordineCasuale").checked,
      domandeConNumero: document.getElementById("domandeConNumero").checked,
      nomeDomande: arrayDomande.map(d => d.id)
    }
    setInfo(RenderInsertTest(testInput));
  }

  function RenderInsertTest(testInput){
    if (tests.find(t => (t.nome === testInput.nomeTest && t.data.localeCompare(testInput.data) === 0)) !== undefined){
      return(
          <div>
            <h1 className={styles.insertTestError}>Test con lo stesso nome già esistente alla data specificata</h1>
          </div>
      )
    }

    if(arrayDomande.length === 0){
      return(
          <div>
            <h1 className={styles.insertTestError}>Errore inserimento: nessuna domanda inserita</h1>
          </div>
      )
    }

    return <InsertTest
        input={testInput}
    />;
  }

  return(
    <div>
       <form onSubmit={handleSubmit}>
        <div className={styles.divDomanda}>
            <h1>Creazione Test</h1>
            Nome Test: <input required id="nomeTest" type="text"/> <br></br><br></br>
            Data: <input required id="data" type="date"/>  <br></br><br></br>
            Ora: <input required id="ora" type="time"/>
          </div>
          <div className={styles.divDomanda}>
            <h2>Lista Domande</h2>
            <div>
              <select id="selectDomande" className={styles.listaDomande} >
                {domande.map((domanda) => (
                  <option key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}</option>
                ))}
              </select>
              <tab className={styles.tab}></tab>
              <button type="button" className={styles.createTestButton} onClick={addDomanda}>Aggiungi</button>
            </div>
          </div>

          <div className={styles.divDomanda}>
            <h2>Domande aggiunte</h2>
            <div>
              <ol>
                {arrayDomande.map((domanda) => (
                  <li className={styles.liCreateTest} key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo} <button className={styles.rimuoviCreateTest} onClick={() => { deleteDomanda(domanda) }}>Rimuovi</button></li>
                ))}
              </ol>
              <div>
                <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
                <label htmlFor="ordineCasuale">Ordine casuale</label>
                <br></br>
                <input id="domandeConNumero" name="domandeConNumero" type="checkbox"></input>
                <label htmlFor="domandeConNumero">Domande con numero</label>
                <br></br><br></br>
                <button id="creaTest" className={styles.creaButton}>Crea Test</button>
              </div>
            </div>
        </div>
       </form>
        {info}
    </div>
  )
}

export default CreateTest;







