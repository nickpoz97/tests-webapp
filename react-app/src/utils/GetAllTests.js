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

const getAllTests = async () => {
    const data = await graphqlRequest(queryBody)
    return data.getAllTests
}

export default getAllTests;
