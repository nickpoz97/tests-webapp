import {Button, Paper, Stack, TextField} from "@mui/material"
import React, {useEffect, useState} from "react"
import styles from "../style.module.css"
import logout from "../utils/Logout";
import login from "../utils/Login";
import Typography from "@mui/material/Typography";
import Appbar from "./Appbar";

const emptyCredentials = {
    username: "",
    password: ""
}

const LoginPage = () => {
    const paperStyle = {padding:'20px', width:'80%'}
    const loginMessageStyle = {color: 'red', padding: '20px, 0, 20px, 0'}

    const [credentials, setCredentials] = useState(emptyCredentials)
    const [loginStatus, setLoginStatus] = useState("pending")
    const [errorMessage, setErrorMessage] = useState(<></>)

    const getUsernameText = () => document.getElementById('username').value;
    const getPasswordText = () => document.getElementById('password').value;

    const textHandler = () => {
        setCredentials({
            username: getUsernameText(),
            password: getPasswordText()
        })
    }

    const submit = () => {
        if(credentials.username === '' || credentials.password === ''){
            alert("Username e/o password non inseriti")
            return
        }

        login(credentials).then(data => {
            if (data.login.success){
                sessionStorage.setItem("logId", data.login.id)
                sessionStorage.setItem("role", data.login.role)
                setLoginStatus("success")
            }
            else{
                setLoginStatus("fail")
            }
        })
        .catch(error => {
            setErrorMessage(<Typography variant="body1" sx={loginMessageStyle}>{error.toString()}</Typography>)
        })
    }

    useEffect(() =>{
        if (sessionStorage.getItem("logId")){
            setLoginStatus("success")
        }
    }, [])

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            submit();
        }
    };

    const logoutCallback = () => {
        logout().then(() => {
            sessionStorage.clear();
            setCredentials(emptyCredentials);
            setLoginStatus("pending");
        })
    }

    if (loginStatus === "success"){
        return <Appbar logoutCallback={logoutCallback}/>
    }
    return(
        //<Stack direction='row' justifyContent='center'>
        <Stack direction='row' justifyContent='center'>
            <Paper elevation={10} sx = {paperStyle} onKeyDown={handleKeypress}>
                <Stack direction='column' alignItems='center' spacing='20px'>
                    <h1 className={styles.loginForm}>Login</h1>
                    <TextField 
                        label='id utente'
                        placeholder=""
                        fullWidth
                        onChange={textHandler}
                        size='large'
                        id='username'
                    />
                    <TextField
                        label='password' 
                        placeholder=""
                        fullWidth
                        type='password'
                        onChange={textHandler}
                        size='large'
                        id='password'
                    />
                    <Button type='submit' variant='contained' size='large' onClick={submit} fullWidth>
                        Invia
                    </Button>
                    {errorMessage}
                </Stack>
            </Paper>
        </Stack>
    )
}

export default LoginPage
