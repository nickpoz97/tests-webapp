import React from "react";
import styles from "../style.module.css";
import Appbar from "./Appbar";
import Domanda from "./Domanda";
import { Link } from 'react-router-dom'


const TESTS_QUERY = `
    query {
        getAllTests {
        data,
        nome,
        orario, 
        ordineCasuale,
        domandeConNumero
        domande{
            nome
            testo
            punti
            risposte{
              id
              testo
              punteggio
            }
          }
        }
    }
    `;

function formatDate(date){
    var data =  date.split("-");
    var newData = data[2] + "/" + data[1] + "/" + data[0];
    return newData;
}

function ordineDomande(test){
    var num_domande = test.domande.length;
    var array_domande = [];
    var ranDomande = [];
    var pos;
    for(var i=1; i<=num_domande; i++){
        array_domande.push(i);
        ranDomande.push(0);
    }

    if(test.ordineCasuale === true){
        i=0;

        while(i<num_domande){
            pos = Math.floor(Math.random() * (num_domande));
            if(ranDomande[pos]===0){
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
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: TESTS_QUERY})
        }).then(response => response.json())
        .then(data => setTests(data.data.getAllTests))
    },[]);    
    return(
        <div>
            <Appbar></Appbar>
            <table className={styles.testTable}>
                <tbody>
                    <tr className={styles.testTr}>
                        <th className={styles.testTh}>Nome</th>
                        <th className={styles.testTh}>Data</th>
                    </tr>
                    
                    {tests.map((test) => (
                    //inzio componente domanda 
                    <tr key={test.data + test.nome + test.orario} className={styles.testTr}>
                        <td className={styles.testTd}><Link state={{ ordineDomande: ordineDomande(test), domande: test.domande }} to={"/test/"+ test.nome +"("+ test.data + "(" + test.orario}> {test.nome}</Link></td>
                        <td className={styles.testTd}> {formatDate(test.data)}</td>
                    </tr>
                    //fine componente domanda 
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Test;
