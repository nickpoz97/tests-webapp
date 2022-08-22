import React from "react";
import styles from "../style.module.css";
import {Link} from 'react-router-dom'
import getAllTests from "../utils/GetAllTests";

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
            <table className={styles.testTable}>
                <tbody>
                    <tr className={styles.testTr}>
                        <th className={styles.testTh}>Nome</th>
                        <th className={styles.testTh}>Data</th>
                        <th className={styles.testTh}>Orario</th>
                    </tr>
                    
                    {tests.map((test) => (
                    //inzio componente domanda 
                    <tr key={test.data + test.nome + test.orario} className={styles.testTr}>
                        <td className={styles.testTd}><Link state={{ ordineDomande: ordineDomande(test), domande: test.domande, test:test, numeraDomande: test.domandeConNumero}} to={"/test/"+ test.nome +"("+ test.data + "(" + test.orario}> {test.nome}</Link></td>
                        <td className={styles.testTd}> {formatDate(test.data)}</td>
                        <td className={styles.testTd}> {test.orario} </td>
                    </tr>
                    //fine componente domanda 
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Test;

