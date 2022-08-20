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

const status = {
  base: <Test />,
  creaDomanda: <CreaDomanda />,
  creaTest: <CreateTest />
}

export default function Appbar(props) {
  const [state, setState] = useState(status.base)
  const clickHandler = (e) => {
    setState(status[e.target.name])
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: {xs: "block", md: 'none'} }}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link name="base" className={styles.linkToHome} onClick={clickHandler} to="#">Home</Link>
            <Link name="creaTest" className={styles.linkToHome} onClick={clickHandler} to="#">Crea Test</Link>
            <Link name="creaDomanda" className={styles.linkToHome} onClick={clickHandler} to="#">Crea Domanda</Link>
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
          <Button color="inherit" onClick={props.logoutCallback}>Logout</Button>
        </Toolbar>
      </AppBar>
      {state}
    </Box>
  );
}