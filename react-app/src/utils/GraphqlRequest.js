const graphqlEndpoint = 'http:' + window.location.href.split(':')[1] + ':8080/graphql'

const graphqlRequest = (queryBody, variables = {}) => fetch(
    graphqlEndpoint,
    {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
            query: queryBody,
            variables: variables,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }
)
    .then(reply => reply.json())
    .then(dataObject => {
        if (dataObject["errors"] === undefined) {
            return dataObject.data
        }
        throw dataObject.errors[0]
    })
    .catch(
        error => {
            throw error
        }
    )

export default graphqlRequest
