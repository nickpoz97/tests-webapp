const graphqlEndpoint = 'http://localhost:8080/graphql'

const graphqlRequest = (queryBody, variables) => fetch(
    graphqlEndpoint,
    {
        method:'POST',
        body: JSON.stringify({
            query: queryBody,
            variables: variables
        }),
        headers: { "Content-Type": "application/json" },
    }
).then(reply => reply.json()).then(data => data.data)

export default graphqlRequest