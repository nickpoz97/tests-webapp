const graphqlEndpoint = 'http:' + window.location.href.split(':')[1] + ':8080/graphql'

const graphqlRequest = (queryBody, variables={}) => fetch(
        graphqlEndpoint,
    {
            method:'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                query: queryBody,
                variables: variables,
            }),
            headers: {
                "Content-Type": "application/json" ,
            }
        }
)
    .then(reply => reply.json())
    .then(data => {
        return data.data
    })

export default graphqlRequest
