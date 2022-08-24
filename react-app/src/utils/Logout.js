import graphqlRequest from "./GraphqlRequest";

const logoutQuery = `
mutation{
    logout{
        success
    }
}
`

const logout = () => graphqlRequest(logoutQuery);
export default logout;