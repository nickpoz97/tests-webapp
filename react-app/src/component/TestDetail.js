import React from "react";
import {useState} from 'react';
import Appbar from "./Appbar";
import styles from "../style.module.css";
import { useParams } from "react-router-dom";

function formatId(id){
  return id.split("(");
}

const TestDetail = () => {
  const { id } = useParams();
  console.log(formatId(id));
  return(
    <div>
      <Appbar></Appbar>
      <div className={styles.testDetailDiv}>
        <h1>Dettaglio Test</h1>
      </div>
    </div>
  )
};

export default TestDetail;