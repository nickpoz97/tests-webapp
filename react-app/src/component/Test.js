import React from "react";
import {Link} from 'react-router-dom'
import getAllTests from "../utils/GetAllTests";
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {GlobalStyle} from '../Style/GlobalStyle'

function formatDate(date){
    var data =  date.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
}

function ordineDomande(test){
    var num_domande = test.domande.length;
    var array_domande = [];
    var ranDomande = [];
    var pos;

    for(var i=1; i<=num_domande; i++){
        array_domande.push(i);
        ranDomande.push(-1);
    }

    if(test.ordineCasuale === true){
        i=0;

        while(i<num_domande){
            pos = Math.floor(Math.random() * (num_domande));
            if(ranDomande[pos]===-1){
                ranDomande[pos] = array_domande[i];
                i++;
            }
        }
        return ranDomande;
        
    }
    return array_domande;
}

const Test = () => {
    const [tests, setTests] = React.useState([]);

    React.useEffect(() => {
        getAllTests()
        .then(data => {
            setTests(data)
        })
    },[]);

    return(
        <div>
                <Stack direction="column" alignItems="center">
                <Typography variant="h1" component="h1" >Test</Typography>
                <Typography variant="body1" sx={{width: "100%"}}>
                <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={GlobalStyle.testTableHead}>
                                Nome
                            </TableCell>
                            <TableCell sx={GlobalStyle.testTableHead}>
                                Data
                            </TableCell>
                            <TableCell sx={GlobalStyle.testTableHead}>
                                Orario
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test) => (
                        //inzio componente domanda 
                            <TableRow key={test.data + test.nome + test.orario}>
                                <TableCell sx={GlobalStyle.testTableContent}><Link state={{ ordineDomande: ordineDomande(test), domande: test.domande, test:test, numeraDomande: test.domandeConNumero}} to={"/test/"+ test.nome +"("+ test.data + "(" + test.orario}> {test.nome}</Link></TableCell>
                                <TableCell sx={GlobalStyle.testTableContent}> {formatDate(test.data)}</TableCell>
                                <TableCell sx={GlobalStyle.testTableContent}> {test.orario} </TableCell>
                            </TableRow>
                        //fine componente domanda 
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Typography>
                </Stack>
        </div>
    )
}
export default Test;

