import styles from "../style.module.css";
import React, {useState} from 'react';
import InsertTest from "./InsertTest";
import getAllDomande from "../utils/GetAllDomande";
import getAllTests from "../utils/GetAllTests";
import { Typography } from "@mui/material";
import {TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import GlobalStyle from '../Style/GlobalStyle'
import dayjs from 'dayjs'


const CreateTest = () =>{

  const [arrayDomande, setArrayDomande] = useState([]);
  const [domande, setDomande] = useState([]);
  const [tests, setTests] = useState([]);

  const [data, setData] = React.useState(
    dayjs(new Date()),
  );

  const handleDataChange = (newValue: Dayjs | null) => {
    setData(newValue);
  };

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
    var giorno = data.$d.getUTCDate();
    var mese = data.$d.getMonth() + 1;
    var anno = data.$d.getFullYear();
    var dataNew = giorno + "/"+ mese + "/" + anno;
    var ora =  data.$d.getHours();
    var minuti = data.$d.getMinutes();
    var secondi = data.$d.getSeconds();
    var orario = ora +":"+minuti+":"+secondi;
    
    const testInput = {
      nome: document.getElementById("nomeTest").value,
      data: dataNew,
      orario: orario,
      ordineCasuale: document.getElementById("ordineCasuale").checked,
      domandeConNumero: document.getElementById("domandeConNumero").checked,
      nomeDomande: arrayDomande.map(d => d.id)
    }

    console.log(testInput)
    
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
      <GlobalStyle />
       <form onSubmit={handleSubmit}>
        <div className={styles.divDomanda}>
            <Typography className="headerCreateTest" variant="h3">Creazione Test</Typography>
            <TextField className="nomeCreateTest" required id="nomeTest" label="nome" variant="outlined" />  <br></br> <br></br> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Data"
              inputFormat="DD/MM/YYYY"
              value={data}
              onChange={handleDataChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <br></br> <br></br> 
            <TimePicker
              label="Ora"
              value={data}
              onChange={handleDataChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
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







