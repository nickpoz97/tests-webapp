import React, {useEffect} from "react";
import styles from "../style.module.css";
import addTest from "../utils/AddTest";

const InsertTest = (props) => {
    const [result, setResult] = React.useState();

    useEffect( () =>
        {
            addTest(props.input).then(result => setResult(result)).catch(error => console.log(error))
        }, []
    )

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
