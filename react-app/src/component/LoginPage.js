import {Alert, Button, Container, Paper, Stack, TextField} from "@mui/material"
import React, {useEffect, useState} from "react"
import logout from "../utils/Logout";
import login from "../utils/Login";
import Typography from "@mui/material/Typography";
import Home from "./home/Home";
import Box from "@mui/material/Box";

const emptyCredentials = {
    username: "",
    password: ""
}

const LoginPage = () => {
    const [credentials, setCredentials] = useState(emptyCredentials)
    const [loginStatus, setLoginStatus] = useState("pending")
    const [errorMessage, setErrorMessage] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const getUsernameText = () => document.getElementById('username').value;
    const getPasswordText = () => document.getElementById('password').value;

    const textHandler = () => {
        setCredentials({
            username: getUsernameText(),
            password: getPasswordText()
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setButtonDisabled(true)

        setErrorMessage(<Alert severity="info">attendere</Alert>)

        login(credentials).then(response => {
            if (response.success){
                sessionStorage.setItem("logId", response.id)
                sessionStorage.setItem("role", response.role)
                setLoginStatus("success")
            }
            else{
                setErrorMessage(<Alert severity="error">{response.message}</Alert>)
            }
        })
        .catch(errors => {
            setErrorMessage(<Alert severity="error">{errors.message}</Alert>)
        })
        .finally(() => setButtonDisabled(false))
    }

    useEffect(() =>{
        if (sessionStorage.getItem("logId")){
            setLoginStatus("success")
        }
    }, [])

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            submitHandler(e);
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
                <form onSubmit={submitHandler}>
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
                            required
                        />
                        <TextField
                            label='password'
                            placeholder=""
                            fullWidth
                            type='password'
                            onChange={textHandler}
                            size='large'
                            id='password'
                            required
                        />
                        <Button id="loginButton" variant='contained' size='large' fullWidth type="submit" disabled={buttonDisabled}>
                            Invia
                        </Button>
                        {errorMessage}
                    </Stack>
                </Box>
                </form>
            </Paper>
        </Container>
    )
}

export default LoginPage
