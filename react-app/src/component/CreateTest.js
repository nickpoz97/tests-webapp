import styles from "../style.module.css";
import React, {useState} from 'react';
import InsertTest from "./InsertTest";
import getAllDomande from "../utils/GetAllDomande";
import getAllTests from "../utils/GetAllTests";
import {
  Alert,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  Typography
} from "@mui/material";
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
import CheckBox from "@mui/material/Checkbox";

const CreateTest = () =>{

  const [arrayDomande, setArrayDomande] = useState([]);
  const [domande, setDomande] = useState([]);

  const [data, setData] = React.useState(
    dayjs(new Date()),
  );

  const handleDataChange = (newValue: Dayjs | null) => {
    setData(newValue);
  };

  React.useEffect(() => {
    getAllDomande()
        .then(result => setDomande(result))
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

  const[info, setInfo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test submitted")
    
    var dataNew = formatDate(data.$d.toLocaleDateString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit',}));
    
    var ora =  String(data.$d.getHours()).padStart(2, '0');
    var minuti = String(data.$d.getMinutes()).padStart(2, '0');
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

    setInfo(
        <Box sx={GlobalStyle.divDomanda}>
          {<InsertTest input={testInput}/>}
        </Box>
    );
  }

  function EmptyList(){
    if(arrayDomande.length === 0){
      return(<Alert severity="info">Inserire almeno 1 domanda</Alert>)
    }
  }

  return(
    <Box>
       <form onSubmit={handleSubmit}>
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
              <NativeSelect id="selectDomande" sx={GlobalStyle.listaDomande}>
                {domande.map((domanda) => (
                  <option key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}</option>
                ))}
              </NativeSelect>
              <Box textAlign='center'>
                <Button sx={GlobalStyle.addButton} variant="contained" onClick={addDomanda} color="success">Aggiungi</Button>
              </Box>
            </Box>
          </Box>

          <Box sx={GlobalStyle.divDomanda}>
            <Typography sx={GlobalStyle.headerCreate} variant="h3">Domande aggiunte</Typography>
            <Box>
              <EmptyList/>
              <List>
                {arrayDomande.map((domanda, index) => (
                  <ListItem className={styles.liCreateTest} key={index} id={domanda.nome} value={domanda.testo}>
                    <Stack direction="row" spacing={5}>
                      <Box>
                        <Typography variant="body1">
                        {domanda.testo}
                        </Typography>
                      </Box>
                      <Box>
                        <Button className="rimuovi" onClick={() => { deleteDomanda(domanda) }} variant="outlined" startIcon={<DeleteIcon />}>
                          Rimuovi
                        </Button>
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
              <Stack sx={GlobalStyle.divCheckBox} spacing={2} >
                <Box>
                <FormControlLabel
                    control={<CheckBox id="ordineCasuale" name="ordineCasuale"/>}
                    label="Ordine casuale"
                />
                </Box>

                <Box>
                  <FormControlLabel
                      control={<CheckBox id="domandeConNumero" name="domandeConNumero"/>}
                      label="Domande con numero"
                  />
                </Box>

                <Box textAlign='center'>
                  <Button className="submitButton" type="submit" variant="contained" color="success">Crea Test</Button>
                </Box>
              </Stack>
            </Box>
        </Box>
           {info}
       </form>
    </Box>
  )
}

export default CreateTest;







