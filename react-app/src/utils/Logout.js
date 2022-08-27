import graphqlRequest from "./GraphqlRequest";

const logoutQuery = `
mutation{
    logout{
        success
    }
}
`

const logout = () => graphqlRequest(logoutQuery).then(data => data.logout).catch(error => {
    throw error
});
export default logout;