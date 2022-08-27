import React from "react";
import styles from "../style.module.css";
import {Link} from 'react-router-dom'
import getAllTests from "../utils/GetAllTests";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";


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
            <Typography variant="h2" component="h1" className={styles.result}>Test</Typography>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize:"1.8em"}}>
                            Nome
                        </TableCell>
                        <TableCell sx={{fontSize:"1.8em"}}>
                            Data
                        </TableCell>
                        <TableCell sx={{fontSize:"1.8em"}}>
                            Orario
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map((test) => (
                    //inzio componente domanda 
                        <TableRow key={test.data + test.nome + test.orario}>
                            <TableCell sx={{fontSize:"1.2em"}}><Link state={{ ordineDomande: ordineDomande(test), domande: test.domande, test:test, numeraDomande: test.domandeConNumero}} to={"/test/"+ test.nome +"("+ test.data + "(" + test.orario}> {test.nome}</Link></TableCell>
                            <TableCell sx={{fontSize:"1.2em"}}> {formatDate(test.data)}</TableCell>
                            <TableCell sx={{fontSize:"1.2em"}}> {test.orario} </TableCell>
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

