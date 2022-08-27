import graphqlRequest from "./GraphqlRequest";

var queryBody = `
mutation($testInput:TestInput!){
  addTest(testInput:$testInput){
    success
  }
}
`;

const addTest = (testInput) => {
    return graphqlRequest(queryBody, {testInput: testInput})
        .then(data => data.addTest)
        .catch(errors => {
            throw errors
        })
};

export default addTest;
