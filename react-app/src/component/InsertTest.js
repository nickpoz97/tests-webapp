import React, {useEffect} from "react";
import styles from "../style.module.css";
import addTest from "../utils/AddTest";
import {Alert} from "@mui/material";

const InsertTest = (props) => {
    const [result, setResult] = React.useState();

    console.log(props)

    useEffect( () => {
            addTest(props.input).then(result => setResult(result)).catch(error => console.log(error))
        }, []
    )

    if(result){
        return(
            <Alert severity="success">Inserimento avvenuto con successo</Alert>
        )
    }
    else{
        return(
            <Alert severity="error">Errore Inserimento</Alert>
        )
    }
}

export default InsertTest;
