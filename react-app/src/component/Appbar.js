import * as React from 'react';
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
import {CreateNewFolder} from "@mui/icons-material";

const status = {
  base: <Test />,
  creaDomanda: <CreaDomanda />,
  creaTest: <CreateNewFolder />
}

export default function Appbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={styles.linkToHome} to="/">Home</Link>
            <Link className={styles.linkToHome} to="/createtest">Crea Test</Link>
            <Link className={styles.linkToHome} to="/createquestion">Crea Domanda</Link>
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
          <Button color="inherit" onClick={props.logoutCallback}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Test />
    </Box>
  );
}