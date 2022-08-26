import {Alert, Button, Container, Paper, Stack, TextField} from "@mui/material"
import React, {useEffect, useState} from "react"
import logout from "../utils/Logout";
import login from "../utils/Login";
import Typography from "@mui/material/Typography";
import Home from "./Home";
import Box from "@mui/material/Box";

const emptyCredentials = {
    username: "",
    password: ""
}

const LoginPage = () => {
    const [credentials, setCredentials] = useState(emptyCredentials)
    const [loginStatus, setLoginStatus] = useState("pending")
    const [errorMessage, setErrorMessage] = useState(null)

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
            setErrorMessage(<Alert severity="warning">username e/o password non inseriti</Alert>)
            return
        }

        login(credentials).then(data => {
            if (data.login.success){
                sessionStorage.setItem("logId", data.login.id)
                sessionStorage.setItem("role", data.login.role)
                setLoginStatus("success")
            }
            else{
                setErrorMessage(<Alert severity="warning">Username o password errati</Alert>)
            }
        })
        .catch(error => {
            setErrorMessage(<Alert severity="error">{error}.toString()</Alert>)
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
            setErrorMessage(null)
        })
    }

    if (loginStatus === "success"){
        return <Home logoutCallback={logoutCallback}/>
    }

    return(
        //<Stack direction='row' justifyContent='center'>
        <Container>
            <Paper elevation={10} onKeyDown={handleKeypress}>
                <Box padding="20px">
                    <Stack direction='column' alignItems='center' spacing="20px">
                        <Typography variant="h3" component="h1">Login</Typography>
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
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage
