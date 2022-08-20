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

const saveAnswer = async (variables) => {
    const data = await graphqlRequest(queryBody, variables)
    return data.addRisposta.success
}

export default saveAnswer;