import {Button, Paper, Stack, TextField} from "@mui/material"
import React, {useState} from "react"
import {SHA256} from "crypto-js"
import App from './App'
import graphqlRequest from "../utils/GraphqlRequest";

const queryBody = `
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

const Login = () => {
    const paperStyle = {padding:'20px', width:'280px'}
    const loginMessageStyle = {color: 'red', padding: '20px, 0, 20px, 0'}

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

        graphqlRequest(queryBody, {
            username: username,
            password: SHA256(password).toString()
        }).then(data => (data.login.success ? setLoginStatus("success") : setLoginStatus("fail")))
    }

    if (loginStatus === "success"){
        return <App />
    }
    return(
        <Stack direction='row' justifyContent='center'>
            <Paper elevation={10} style = {paperStyle}>
                <Stack direction='column' alignItems='center' spacing='20px'>
                    <h1>Login</h1>
                    <TextField 
                        label='id utente'
                        placeholder="inserisci il tuo id"
                        fullWidth
                        onChange={usernameHandler}
                    />
                    <TextField
                        label='password' 
                        placeholder="inserisci la password dell' id"
                        fullWidth
                        type='password'
                        onChange={passwordHandler}
                    />
                    <Button type='submit' variant='contained' size='medium' onClick={submit}>
                        Invia
                    </Button>
                    {loginStatus === "fail" ?
                        <p style={loginMessageStyle}>Id o password errati</p> : ""}
                </Stack>
            </Paper>
        </Stack>
    )
}

export default Login
