import graphqlRequest from "./GraphqlRequest";

var queryBody = `
mutation($testInput:TestInput!){
  addTest(testInput:$testInput){
    success
  }
}
`;

const addTest = (testInput) => {
    return graphqlRequest(queryBody, {testInput: testInput}).then(data => data.addTest);
}

export default addTest;
