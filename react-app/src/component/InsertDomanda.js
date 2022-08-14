import React from "react";
import styles from "../style.module.css";



const InsertDomanda = (props) => {
    const [result, setResult] = React.useState([]);

    /*
    fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: props.post})
    }).then(response => response.json())
    .then(data => setResult(data.data.addTest));
    */

    return <h1>{props.post}</h1>
}

export default InsertDomanda;


