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

const getAllDomande = async () => {
    const data = await graphqlRequest(queryBody)
    return data.getAllDomande
}

export default getAllDomande;
