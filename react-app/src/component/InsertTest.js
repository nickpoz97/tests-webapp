import React, {useEffect} from "react";
import addTest from "../utils/AddTest";
import {Alert} from "@mui/material";

const InsertTest = (props) => {
    const [result, setResult] = React.useState(undefined);

    console.log(props)

    useEffect( () => {
            addTest(props.input)
                .then(result => setResult(result))
                .catch(error => setResult({success: false, message: error.message}))
        }, []
    )

    if(result === undefined){
        return null
    }

    return <Alert severity={result.success ? "success" : "error"}>{result.message}</Alert>
}

export default InsertTest;
