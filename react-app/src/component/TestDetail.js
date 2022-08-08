import React from "react";
import {useState} from 'react';
import Appbar from "./Appbar";
import styles from "../style.module.css";
import { useParams } from "react-router-dom";
import { style } from "@mui/system";


function formatId(id){
  return id.split("(");
}

const TestDetail = () => {
  const { id } = useParams();
  var form_id = formatId(id);

  const TEST_BY_ID_QUERY = `
    query{
      getTestById(
          data:"` +form_id[1] +`"
          nome:"` +form_id[0] +`"
          orario: "` +form_id[2] +`"
      ){
          nome
          data
          orario
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
  const [domande, setDomande] = React.useState([]);

  React.useEffect(() => {
      fetch('http://localhost:8080/graphql', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({query: TEST_BY_ID_QUERY})
      }).then(response => response.json())
      .then(data => setDomande(data.data.getTestById.domande))
      },[]);  


  return(
    <div>
      <Appbar></Appbar>
      <div className={styles.testDetailDiv}>
        <h1 className={styles.testDetailH1}>{form_id[0]}:</h1>
        <div className={styles.testDetailDiv2}>
          {domande.map((domanda) => (
            <div>
              <h2 key={domanda.nome} className={styles.testDetailH2}>{domanda.nome}</h2>
                <div className={styles.testDetailDiv3}>
                  <h3 className={styles.testDetailH3}>{domanda.testo}</h3>
                  {domanda.risposte.map((risposta) => (
                    <div className={styles.testDetailDivRisposta}>
                      <input name={domanda.nome} type="radio" key={risposta.id} value={risposta.testo}></input>
                      <label className={styles.testDetailLabel}>{risposta.testo}</label>
                    </div>
                  ))}
                </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
};

export default TestDetail;