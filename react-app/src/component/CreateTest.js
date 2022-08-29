import styles from "../style.module.css";
import React, {useState} from 'react';
import InsertTest from "./InsertTest";
import getAllDomande from "../utils/GetAllDomande";
import getAllTests from "../utils/GetAllTests";
import {FormControl, Input, MenuItem, Select, Stack, Typography} from "@mui/material";
import {TextField} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {GlobalStyle} from '../Style/GlobalStyle'
import dayjs from 'dayjs'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

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

  function formatDate(date){
    var data =  date.split("/");
    return data[2] + "-" + data[0] + "-" + data[1];
  }

  const[info, setInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    var dataNew = formatDate(data.$d.toLocaleDateString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit',}));
    
    var ora =  data.$d.getHours();
    var minuti = String(data.$d.getMinutes()).padStart(2, '0')
    var secondi = data.$d.getSeconds();
    var orario = ora +":"+minuti;
    
    const testInput = {
      nome: document.getElementById("nomeTest").value,
      data: dataNew,
      orario: orario,
      ordineCasuale: document.getElementById("ordineCasuale").checked,
      domandeConNumero: document.getElementById("domandeConNumero").checked,
      nomeDomande: arrayDomande.map(d => d.id)
    }

    setInfo(RenderInsertTest(testInput));
  }

  function EmptyList(){
    if(arrayDomande.length === 0){
      return(<Typography className="headerCreateTest" variant="h4" color="red">nessuna domanda inserita...</Typography>)
    }
  }

  function RenderInsertTest(testInput){
    if (tests.find(t => (t.nome === testInput.nomeTest && t.data.localeCompare(testInput.data) === 0)) !== undefined){
      return(
          <Box>
            <h1 className={styles.insertTestError}>Test con lo stesso nome già esistente alla data specificata</h1>
          </Box>
      )
    }

    if(arrayDomande.length === 0){
      return(
          <Box>
            <h1 className={styles.insertTestError}>Errore inserimento: nessuna domanda inserita</h1>
          </Box>
      )
    }

    return <InsertTest
        input={testInput}
    />;
  }

  return(
    <Box>
       <FormControl onSubmit={handleSubmit} fullWidth>
        <Box className={styles.divDomanda}>
            <Typography sx={GlobalStyle.headerCreate} variant="h3">Creazione Test</Typography>
          <Box sx={GlobalStyle.formCreate}>
            <TextField required id="nomeTest" label="nome" variant="outlined" />
          </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={GlobalStyle.formCreate}>
              <DesktopDatePicker
                sx={GlobalStyle.formCreate}
                label="Data"
                inputFormat="DD/MM/YYYY"
                value={data}
                onChange={handleDataChange}
                renderInput={(params) => <TextField {...params} />}
              />
              </Box>
              <Box sx={GlobalStyle.formCreate}>
              <TimePicker
                sx={GlobalStyle.formCreate}
                label="Ora"
                value={data}
                onChange={handleDataChange}
                renderInput={(params) => <TextField {...params} />}
              />
              </Box>
            </LocalizationProvider>
          </Box>
          <Box sx={GlobalStyle.divDomanda}>
            <Typography sx={GlobalStyle.headerCreate} variant="h3">Lista Domande</Typography>
            <Box>
              <Select id="selectDomande" sx={GlobalStyle.listaDomande}>
                {domande.map((domanda) => (
                  <MenuItem key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}</MenuItem>
                ))}
              </Select>
              <Box textAlign='center'>
                <Button sx={GlobalStyle.addButton} variant="contained" onClick={addDomanda} color="success">Aggiungi</Button>
              </Box>
            </Box>
          </Box>

          <Box sx={GlobalStyle.divDomanda}>
            <Typography sx={GlobalStyle.headerCreate} variant="h3">Domande aggiunte</Typography>
            <Box>
              <EmptyList/>
              <ol>
                {arrayDomande.map((domanda) => (
                  <li className={styles.liCreateTest} key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}
                  <Box sx={{ justifyContent: 'flex-end' }}>
                    <Button className="rimuovi" onClick={() => { deleteDomanda(domanda) }} variant="outlined" startIcon={<DeleteIcon />}>
                      Rimuovi
                    </Button>
                  </Box>
                  </li>
                ))}
              </ol>
              <Stack sx={GlobalStyle.divCheckBox} spacing={2} >
                <Box>
                <Input id="ordineCasuale" name="ordineCasuale" type="checkbox"></Input>
                <label className="checkBox" htmlFor="ordineCasuale">Ordine casuale</label>
                </Box>

                <Box>
                <input id="domandeConNumero" name="domandeConNumero" type="checkbox"></input>
                <label className="checkBox" htmlFor="domandeConNumero">Domande con numero</label>
                </Box>

                <Box textAlign='center'>
                  <Button className="submitButton" type="submit" variant="contained" color="success">Crea Test</Button>
                </Box>
              </Stack>
            </Box>
        </Box>
       </FormControl>
        {info}
    </Box>
  )
}

export default CreateTest;







