import React, {useState} from 'react';
import displayInfo from "../utils/DisplayInfo";
import getAllDomande from "../utils/GetAllDomande";
import {
    Alert,
    Divider,
    FormControlLabel,
    List,
    ListItem,
    NativeSelect,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {GlobalStyle} from '../Style/GlobalStyle'
import dayjs from 'dayjs'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from "@mui/material/Checkbox";
import addTest from "../utils/AddTest";

const CreateTest = () => {

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
    }, []);

    function addDomanda() {
        let e = document.getElementById("selectDomande");

        const domanda = {
            id: e.options[e.selectedIndex].id,
            testo: e.options[e.selectedIndex].value,
        };

        if (arrayDomande.map(d => d.id).includes(domanda.id)) {
            alert("AnswerQuestion con lo stesso titolo già inserita");
            return;
        }

        setArrayDomande([...arrayDomande, domanda]);
    }

    function deleteDomanda(domanda) {
        let array = [...arrayDomande];
        let index = array.indexOf(domanda)
        array.splice(index, 1);
        setArrayDomande(array);
    }

    function formatDate(date) {
        var data = date.split("/");
        return data[2] + "-" + data[0] + "-" + data[1];
    }

    const [info, setInfo] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("test submitted")

        var dataNew = formatDate(data.$d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }));

        var ora = String(data.$d.getHours()).padStart(2, '0');
        var minuti = String(data.$d.getMinutes()).padStart(2, '0');
        var orario = ora + ":" + minuti;

        const testInput = {
            nome: document.getElementById("nomeTest").value,
            data: dataNew,
            orario: orario,
            ordineCasuale: document.getElementById("ordineCasuale").checked,
            domandeConNumero: document.getElementById("domandeConNumero").checked,
            nomeDomande: arrayDomande.map(d => d.id)
        }

        displayInfo(addTest, testInput, GlobalStyle.divDomanda).then(result =>
            setInfo(result)
        )
    }

    function EmptyList() {
        if (arrayDomande.length === 0) {
            return (<Alert severity="info">Inserire almeno 1 domanda</Alert>)
        }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box sx={GlobalStyle.divCreaDomanda}>
                    <Typography sx={GlobalStyle.headerCreate} variant="h3">Creazione Test</Typography>
                    <Box sx={GlobalStyle.formCreate}>
                        <TextField required id="nomeTest" label="nome" variant="outlined"/>
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
                                <option key={domanda.nome} id={domanda.nome}
                                        value={domanda.testo}>{domanda.testo}</option>
                            ))}
                        </NativeSelect>
                        <Box textAlign='center'>
                            <Button sx={GlobalStyle.addButton} variant="contained" onClick={addDomanda}
                                    color="success">Aggiungi</Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={GlobalStyle.divRisposte}>
                    <Typography sx={GlobalStyle.headerCreate} variant="h3">Domande aggiunte</Typography>
                    <Box>
                        <EmptyList/>
                        <List>
                            {arrayDomande.map((domanda, index) => (
                                <>
                                    <ListItem sx={GlobalStyle.liCreateTest} key={index} id={domanda.nome}
                                              value={domanda.testo}>
                                        <Stack direction="row" width="100%">
                                            <Box width="50%">
                                                <Typography variant="body1">
                                                    {domanda.testo}
                                                </Typography>
                                            </Box>
                                            <Stack width="50%" alignItems="flex-end" justifyContent="center">
                                                <Button
                                                    className="rimuovi"
                                                    onClick={() => {
                                                        deleteDomanda(domanda)
                                                    }}
                                                    variant="contained"
                                                    startIcon={<DeleteIcon/>}
                                                    color="error"
                                                >
                                                    Rimuovi
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </ListItem>
                                    <Divider/>
                                </>
                            ))}
                        </List>
                        <Stack sx={GlobalStyle.divCheckBox} spacing={2}>
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
                                <Button className="submitButton" type="submit" variant="contained" color="success">Crea
                                    Test</Button>
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







