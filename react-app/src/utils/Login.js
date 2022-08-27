import graphqlRequest from "./GraphqlRequest";

const loginQuery = `
mutation($username:String!, $password:String!){
  login(
    username: $username
    password: $password
  )
  {
    success
    role
    message
    id
  }
} 
`

const login = (credentials) => graphqlRequest(loginQuery, credentials)
    .then(data => data.login)
    .catch(errors => {
        throw errors
    });
export default login;
