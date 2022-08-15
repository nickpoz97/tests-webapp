import React from "react";
import styles from "../style.module.css";

const TESTS_QUERY = `
    query {
        getAllTests {
        data,
        nome,
        }
    }
    `;

const InsertTest = (props) => {
    const [result, setResult] = React.useState([]);

    fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: props.post})
    }).then(response => response.json())
        .then(data => setResult(data.data.addTest));

    if(result){
        return(
            <div>
                <h1 className={styles.insertTestSuccess}>Inserimento avvenuto con successo</h1>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1 className={styles.insertTestError}>Errore Inserimento</h1>
            </div>
        )
    }
}

export default InsertTest;
