import React from "react";

const TESTS_QUERY = `
    query {
        getAllTests {
        data,
        nome,
        ordineCasuale,
        domandeConNumero
        }
    }
    `;

const Form = () => {
    
    React.useEffect(() => {
        fetch('http://localhost:8080/graphql/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: TESTS_QUERY})
        }).then(response => response.json()).then(data => console.log(data))
    },[]);
    
    return(
        <div>
            <h1>Ciao</h1>
        </div>
    )
}
export default Form;