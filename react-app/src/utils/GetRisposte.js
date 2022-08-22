import graphqlRequest from "./GraphqlRequest";

const queryBody = `
query($nomeTest: String!, $orarioTest: LocalTime!, $dataTest: Date!){
  getRisposte(
    nomeTest: $nomeTest
    orarioTest: $orarioTest
    dataTest: $dataTest
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

const getRisposte = (nomeTest, dataTest, orarioTest) => {
    const variables = {
        nomeTest: nomeTest,
        dataTest: dataTest,
        orarioTest: orarioTest
    }

    console.log(JSON.stringify(variables))

    return graphqlRequest(queryBody, variables).then(data => data.getRisposte);
}

export default getRisposte;
