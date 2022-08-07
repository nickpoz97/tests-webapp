import React from "react";
import styles from "../style.module.css";
import Appbar from "./Appbar";
import { Link } from 'react-router-dom';



const TESTS_QUERY = `
    query {
        getAllTests {
        data,
        nome,
        ordineCasuale,
        domandeConNumero
        }
    }
    `;

function formatDate(date){
    var data =  date.split("-");
    var newData = data[2] + "/" + data[1] + "/" + data[0];
    return newData;
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
                    <tr key={test.data + test.nome} className={styles.testTr}>
                        <td className={styles.testTd}><a href={"/test/"+ test.data + test.nome}> {test.nome}</a></td>
                        <td className={styles.testTd}> {formatDate(test.data)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Test;

