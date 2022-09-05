import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TestList from "../TestList";
import {Hidden, Stack} from "@mui/material";
import {BigScreenLinksRendering, SmallScreenListRendering} from "./Links";

export default function Home(props) {
    const [state, setState] = useState(<TestList/>)
    const [toggleDrawer, setToggleDrawer] = useState(false)

    // close drawer when changing state
    useEffect(() => {
        setToggleDrawer(false)
    }, [state])

    // When the user is a teacher, hamburger menu only shows on small screen
    const TeacherTools = () => {
        if (sessionStorage.getItem("role") === 'INSEGNANTE') {
            return (
                <Box sx={{flexGrow: 1}}>
                    <Hidden smUp>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => setToggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <SmallScreenListRendering
                            setState={setState}
                            open={toggleDrawer}
                            setOpen={setToggleDrawer}
                        />
                    </Hidden>
                    <Hidden smDown>
                        <BigScreenLinksRendering setState={setState}/>
                    </Hidden>
                </Box>
            )
        }

        // if student
        return <Box/>
    }

    const LogoutButton = () => {
        return (
            <Stack alignItems="flex-end" flexGrow={1}>
                <Button color="inherit" onClick={props.logoutCallback}>Logout</Button>
            </Stack>
        )
    }

    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <TeacherTools/>
                    <LogoutButton/>
                </Toolbar>
            </AppBar>
            {state}
        </Box>
    );
}