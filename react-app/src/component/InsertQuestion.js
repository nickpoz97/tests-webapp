import React, {useEffect} from "react";
import styles from "../style.module.css";
import addDomanda from "../utils/AddDomanda";


const InsertQuestion = (props) => {
    const [result, setResult] = React.useState([]);
    
    useEffect(()=>{
        addDomanda(props.domandaInput).then(result => setResult(result)).catch(error => console.log(error))
    },[])

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


