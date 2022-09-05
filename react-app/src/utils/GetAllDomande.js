import graphqlRequest from "./GraphqlRequest";

const queryBody = `
    query {
      getAllDomande {
          nome
          testo
          punti
          ordineCasuale
          risposteConNumero
          risposte{
              id
              testo
          }
      }
    }
`;

const getAllDomande = () => graphqlRequest(queryBody)
    .then(data => data.getAllDomande)
    .catch(errors => {
        throw errors
    })

export default getAllDomande;
