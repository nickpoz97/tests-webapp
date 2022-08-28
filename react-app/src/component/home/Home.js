import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Test from "../Test";
import {createTheme, Hidden, responsiveFontSizes, Stack, ThemeProvider} from "@mui/material";
import {BigScreenLinksRendering , SmallScreenListRendering} from "./links";

export default function Home(props) {
  const [state, setState] = useState(<Test />)
  const [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    setToggleDrawer(false)
  }, [state])

  const TeacherTools = () => {
    if (sessionStorage.getItem("role") === 'INSEGNANTE') {
      return (
      <>
      <Hidden mdUp>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setToggleDrawer(true)}
      >
      <MenuIcon />
      </IconButton>
      <SmallScreenListRendering
          setState={setState}
          open={toggleDrawer}
          setOpen={setToggleDrawer}
      />
      </Hidden>
      <Hidden mdDown>
      <BigScreenLinksRendering setState={setState} />
      </Hidden>
      </>
      )
    }
    return <Box sx={{flexGrow: 1}} />
  }

  const theme = responsiveFontSizes(createTheme());

  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <TeacherTools />
          <Stack alignItems="flex-end" flexGrow={1}>
            <Button color="inherit" onClick={props.logoutCallback} >Logout</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {state}
    </ThemeProvider>
    </Box>
  );
}