import styles from "../style.module.css";
import React, {useState} from 'react';
import InsertTest from "./InsertTest";
import getAllDomande from "../utils/GetAllDomande";
import getAllTests from "../utils/GetAllTests";

function getOrario(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

function getToday(){
  var date = new Date();
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

const CreateTest = () =>{

  const [arrayDomande, setArrayDomande] = useState([]);

  function addDomanda(){
    var e = document.getElementById("selectDomande");
    var value = e.value;
    var id = e.options[e.selectedIndex].id;
    var text = e.options[e.selectedIndex].text;

    const domanda = {
      id: id,
      testo: text,
    };

    var flag = 0;

    if(arrayDomande.length === 0){
      setArrayDomande([...arrayDomande, domanda]);
    }
    else{
      for(var i = 0; i<arrayDomande.length; i++){
       if(arrayDomande[i].id === id){
        flag = 1
        break;
       }
      }
      if(flag === 1){
        alert("Domanda già inserita");
      }
      else{
        setArrayDomande([...arrayDomande, domanda]);
      }
    }
    //return false;
  }

  function deleteDomanda(domanda){
    var array = [...arrayDomande];
    var index = array.indexOf(domanda)
    array.splice(index, 1);
    setArrayDomande(array);
  }


  const [domande, setDomande] = React.useState([]);
    const [tests, setTests] = React.useState([]);

    React.useEffect(() => {
        getAllDomande()
        .then(result => setDomande(result))

        getAllTests()
        .then(result => setTests(result))
    },[]);

  function RenderInsertTest(){
    for(var i=0; i<tests.length;i++){
      if(tests[i]){
          if(tests[i].nome === nomeTest && tests[i].data.localeCompare(data) === 0){
            return(
              <div>
                  <h1 className={styles.insertTestError}>Test con lo stesso nome già esistente alla data specificata</h1>
              </div>
            ) 
          }
      }
    }
    if(submitted && arrayDomande.length == 0){
      return(
        <div>
            <h1 className={styles.insertTestError}>Errore inserimento: nessuna domanda inserita</h1>
        </div>
      )
    }
    else{
      if(submitted){
        return <InsertTest post={query} num_dom={arrayDomande.length} data={data} nome_test={nomeTest}/>;
      }
    }
    
  }

  const[submitted, setSubmitted] = useState(false);
  const[query, setQuery] = useState("");
  const[data, setData] = useState();
  const[nomeTest, setNomeTest] = useState();

  const handleSubmit = (event) => {
    setSubmitted(true);
    event.preventDefault();
    var nome_test = document.getElementById("nome_test");
    var data = document.getElementById("data");
    var ora = document.getElementById("ora");
    var ordine_casuale = document.getElementById("ordineCasuale");
    var domande_con_numero = document.getElementById("domandeConNumero");

    setData(data.value);
    setNomeTest(nome_test.value);

    var domande_string = "";
    for(var i=0; i<arrayDomande.length; i++){
      domande_string += '"'+arrayDomande[i].id+'",';
    }

    var str_query = `
        mutation{
          addTest(
              testInput: {
                  giornoDelMese:`+ parseInt(data.value.split("-")[2]) +`,
                  mese: `+ parseInt(data.value.split("-")[1]) +`,
                  anno: `+ parseInt(data.value.split("-")[0]) +`,
                  ora: `+ ora.value.split(":")[0] +`,
                  minuto: `+ ora.value.split(":")[1] +`,
                  nome:"`+ nome_test.value +`",
                  ordineCasuale: `+ ordine_casuale.checked +`,
                  domandeConNumero:  `+ domande_con_numero.checked +`,
                  nomeDomande: [
                    `+ domande_string +`
                  ]
              }
          ){
              success
          }
        }
        `;
        setQuery(str_query);
        RenderInsertTest();
  }


  return(
    <div>
       <form onSubmit={handleSubmit}>
        <div className={styles.divDomanda}>
            <h1>Creazione Test</h1>
            Nome Test: <input required id="nome_test" type="text"/> <br></br><br></br>
            Data: <input required id="data" type="date" placeholder={getToday()}/>  <br></br><br></br>
            Ora: <input required id="ora" value={getOrario()}/>
          </div>
          <div className={styles.divDomanda}>
            <h2>Lista Domande</h2>
            <div>
              <select id="selectDomande" className={styles.listaDomande} >
                {domande.map((domanda) => (
                  <option key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo}</option>
                ))}
              </select>
              <tab className={styles.tab}></tab>
              <button type="button" className={styles.createTestButton} onClick={addDomanda}>Aggiungi</button>
            </div>
          </div>

          <div className={styles.divDomanda}>
            <h2>Domande aggiunte</h2>
            <div>
              <ol>
                {arrayDomande.map((domanda) => (
                  <li className={styles.liCreateTest} key={domanda.nome} id={domanda.nome} value={domanda.testo}>{domanda.testo} <button className={styles.rimuoviCreateTest} onClick={() => { deleteDomanda(domanda) }}>Rimuovi</button></li>
                ))}
              </ol>
              <div>
                <input id="ordineCasuale" name="ordineCasuale" type="checkbox"></input>
                <label for="ordineCasuale">Ordine casuale</label>
                <br></br>
                <input id="domandeConNumero" name="domandeConNumero" type="checkbox"></input>
                <label for="domandeConNumero">Domande con numero</label>
                <br></br><br></br>
                <button id="creaTest" className={styles.creaButton}>Crea Test</button>
              </div>
            </div>
        </div>
       </form>
       <RenderInsertTest/>
    </div>
  )
}

export default CreateTest;







