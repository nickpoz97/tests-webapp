import React from "react";
 import {Link} from 'react-router-dom'
import getAllTests from "../utils/GetAllTests";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@material-ui/core';
import GlobalStyle from '../Style/GlobalStyle'


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
            <GlobalStyle />
                <Stack direction="column" alignItems="center">
                <Typography className="h1Test">Test</Typography>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className="testTableHead">
                                Nome
                            </TableCell>
                            <TableCell className="testTableHead"> 
                                Data
                            </TableCell>
                            <TableCell className="testTableHead">
                                Orario
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test) => (
                        //inzio componente domanda 
                            <TableRow key={test.data + test.nome + test.orario}>
                                <TableCell className="testTableContent"><Link state={{ ordineDomande: ordineDomande(test), domande: test.domande, test:test, numeraDomande: test.domandeConNumero}} to={"/test/"+ test.nome +"("+ test.data + "(" + test.orario}> {test.nome}</Link></TableCell>
                                <TableCell className="testTableContent"> {formatDate(test.data)}</TableCell>
                                <TableCell className="testTableContent"> {test.orario} </TableCell>
                            </TableRow>
                        //fine componente domanda 
                        ))}
                    </TableBody>
                </Table>
                </Stack>
        </div>
    )
}
export default Test;

