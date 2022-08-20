import {Button, Paper, Stack, TextField} from "@mui/material"
import React, {useEffect, useState} from "react"
import {SHA256} from "crypto-js"
import App from './App'
import graphqlRequest from "../utils/GraphqlRequest";
import styles from "../style.module.css"

const loginQuery = `
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

const logoutQuery = `
mutation{
    logout{
        success
    }
}
`

const Login = () => {
    const paperStyle = {padding:'20px', width:'80%'}
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
            return
        }

        graphqlRequest(loginQuery, {
            username: username,
            password: SHA256(password).toString()
        }).then(data => {
            if (data.login.success){
                sessionStorage.setItem("logged", "1")
                setLoginStatus("success")
            }
            else{
                setLoginStatus("fail")
            }
        })
    }

    useEffect(() =>{
        if (sessionStorage.getItem("logged")){
            setLoginStatus("success")
        }
    }, [])

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            submit();
        }
    };

    const logout = async () => {
        graphqlRequest(logoutQuery).then(data => setLoginStatus("pending"))
        setUsername("")
        setPassword("")
        sessionStorage.clear()
    }

    if (loginStatus === "success"){
        return <App logoutCallback={logout} />
    }
    return(
        //<Stack direction='row' justifyContent='center'>
        <Stack direction='row' justifyContent='center'>
            <Paper elevation={10} sx = {paperStyle} onKeyDown={handleKeypress}>
                <Stack direction='column' alignItems='center' spacing='20px'>
                    <h1 className={styles.loginForm}>Login</h1>
                    <TextField 
                        label='id utente'
                        placeholder="inserisci il tuo id"
                        fullWidth
                        onChange={usernameHandler}
                        size='large'
                    />
                    <TextField
                        label='password' 
                        placeholder="inserisci la password dell' id"
                        fullWidth
                        type='password'
                        onChange={passwordHandler}
                        size='large'
                    />
                    <Button type='submit' variant='contained' size='large' onClick={submit} fullWidth>
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
