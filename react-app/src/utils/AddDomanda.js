import graphqlRequest from "./GraphqlRequest";

const queryBody = `
mutation($domandaInput:DomandaInput!){
  addDomanda(domandaInput:$domandaInput){
    success
  }
}
`

const addDomanda = (domandaInput) => {
    return graphqlRequest(queryBody, {domandaInput: domandaInput}).then(data => data.addDomanda)
}

export default addDomanda;