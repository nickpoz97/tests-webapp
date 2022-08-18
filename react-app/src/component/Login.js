import {Button, Grid, Paper, TextField} from "@mui/material"
import React, {useState} from "react"
import {SHA256} from "crypto-js"
import App from './App'

const query = `
mutation($username:String!, $password:String!){
    login(
      username: $username
      password: $password
    )
    {
      success
    }
  }  
`

const graphqlEnpoint = 'http://localhost:8080/graphql'

const request = (variables) => fetch(
    graphqlEnpoint,
    {
        method:'POST',
        body: JSON.stringify({
            query: query,
            variables: variables
        }),
        headers: { "Content-Type": "application/json" },
    }
).then(reply => reply.json()).then(data => data.data)

const Login = () => {
    const paperStyle = {padding:'20px', width:'280px'} 
    const textFiledStyle = {margin: '0px 0px 20px 0px'}
    const buttonStyle = {margin: '0 100%'}
    const loginMessageStyle = {color: 'red'}

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState("pending")

    const usernameHandler = (event) => {setUsername(event.target.value)}  
    const passwordHandler = (event) => {setPassword(event.target.value)} 
    const submit = () => {
        //console.log(`Username: ${username}, Password: ${SHA256(password).toString()}`)
        if(username === '' || password === ''){
            alert("Username e/o password non inseriti")
        }

        request({
            username: username,
            password: SHA256(password).toString()
        }).then(data => (data.login.success ? setLoginStatus("success") : setLoginStatus("fail")))
    }

    const loginMessage = loginStatus === "fail" ? <p style={loginMessageStyle}>Id o password errati</p> : ""

    if (loginStatus === "success"){
        return <App />
    }
    return(
        <Grid container justifyContent='center'>
            <Paper elevation={10} style = {paperStyle}>
                <Grid container justifyContent='center'>
                    <h1>Login</h1>
                    <TextField 
                        label='id utente'
                        placeholder="inserisci il tuo id"
                        fullWidth
                        style={textFiledStyle}
                        onChange={usernameHandler}
                    />
                    <TextField
                        label='password' 
                        placeholder="inserisci la password dell' id"
                        fullWidth
                        style={textFiledStyle}
                        type='password'
                        onChange={passwordHandler}
                    />
                    <Button type='submit' variant='contained' size='medium' onClick={submit} style={buttonStyle}>
                        Invia
                    </Button>
                    {loginMessage}
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login
