import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import styles from "../style.module.css";
import Test from "./Test";
import CreaDomanda from "./CreaDomanda";
import CreateTest from "./CreateTest";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";

const status = {
  home: <Test />,
  creaDomanda: <CreaDomanda />,
  creaTest: <CreateTest />
}

export default function Home(props) {
  const [state, setState] = useState(status.home)

  const clickHandler = (e) => {
    setState(status[e.target.name])
  }

  const TeacherTools = () => {
    if (sessionStorage.getItem("role") === 'INSEGNANTE') {
      return (
      <>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: {xs: "block", md: 'none'} }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }} >
        <Box sx = {{display: {xs: "none", md: 'block'}}}>
          <Link name="home" className={styles.linkToHome} onClick={clickHandler} to="#">Home</Link>
          <Link name="creaTest" className={styles.linkToHome} onClick={clickHandler} to="#">Crea Test</Link>
          <Link name="creaDomanda" className={styles.linkToHome} onClick={clickHandler} to="#">Crea Domanda</Link>
        </Box>
      </Typography>
      </>
      )
    }
    return <Box sx={{flexGrow: 1}} />
  }

  const theme = responsiveFontSizes(createTheme());

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TeacherTools />
          <Button color="inherit" onClick={props.logoutCallback}>Logout</Button>
        </Toolbar>
      </AppBar>
      {state}
    </Box>
    </ThemeProvider>
  );
}