import graphqlRequest from "./GraphqlRequest";

const queryBody = `
query {
    getAllTests {
        data,
        nome,
        orario, 
        ordineCasuale,
        domandeConNumero
        domande{
            nome
            testo
            punti
            ordineCasuale
            risposteConNumero
            risposte{
              id
              testo
              punteggio
            }
          }
    }
}
`

const getAllTests = () => graphqlRequest(queryBody)
        .then(data => data.getAllTests)
        .catch(errors => {
            throw errors
        })

export default getAllTests;
