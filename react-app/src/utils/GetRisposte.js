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

    return graphqlRequest(queryBody, variables)
        .then(data => data.getRisposte)
        .catch(errors => {
            throw errors
        });
}

export default getRisposte;
