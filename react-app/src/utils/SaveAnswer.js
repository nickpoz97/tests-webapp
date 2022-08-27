import graphqlRequest from "./GraphqlRequest";

const queryBody = `
mutation($nomeTest:String!, $dataTest:Date!, $orarioTest:LocalTime!, $idRisposta:Long!, $nomeDomanda:String!){
  addRisposta(
    nomeTest:$nomeTest
    dataTest:$dataTest
    orarioTest:$orarioTest
    idRisposta:$idRisposta
    nomeDomanda:$nomeDomanda
  ){
    success
  }
}
`

const saveAnswer = (variables) => graphqlRequest(queryBody, variables)
    .then(data => data.addRisposta)
    .catch(error => {
        throw error
    })

export default saveAnswer;