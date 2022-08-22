import React, {useEffect} from "react";
import styles from "../style.module.css";


const InsertQuestion = (props) => {
    const [result, setResult] = React.useState([]);
    
    useEffect(()=>{fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: props.post})
    }).then(response => response.json())
    .then(data => setResult(data.data.addDomanda))},[])

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

export default InsertQuestion;


