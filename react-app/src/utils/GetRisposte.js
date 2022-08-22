import graphqlRequest from "./GraphqlRequest";

const queryBody = `
query{
  getRisposte(
    nomeTest: "Basi di Dati - II appello laboratorio"
    orarioTest:"09:00:00"
    dataTest:"2020-07-07"
  ){
    id
    testo
    punteggio
    domanda {
      nome
      punti
      risposte{
        punteggio
        testo
      }
    }
  }
}
`

const getRisposte = () => graphqlRequest(queryBody).then(data => data.getRisposte);

export default getRisposte;
