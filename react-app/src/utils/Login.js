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

const login = (credentials) => graphqlRequest(loginQuery, credentials);
export default login;
