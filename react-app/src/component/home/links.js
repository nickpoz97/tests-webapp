import CreateTest from "../CreateTest";
import CreaDomanda from "../CreaDomanda";
import * as React from "react";
import {Link} from "react-router-dom";
import styles from "../../style.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {List, ListItem, SwipeableDrawer} from "@mui/material";

const links = [
    {text: "Crea Test", ref: <CreateTest />},
    {text: "Crea Domanda", ref: <CreaDomanda />}
]

const StandardLinkList = (props) => {
    const clickHandler = (e) => {
        const index = parseInt(e.target.name)
        props.setState(links[index].ref)
    }

    return links.map(
        (link, index) =>
            <Link name={index} key={index} className={styles.linkToHome} onClick={clickHandler}
                  to="#">{link.text}</Link>
    );
}

const BigScreenLinksRendering = (props) => {
    return(
        <Typography variant="h6" sx={{ flexGrow: 1 }} >
        <Box>
            <StandardLinkList setState={props.setState}/>
        </Box>
        </Typography>
    )
}

const DrawerLinkList = (props) => {
    return(
        <List>
            {StandardLinkList({setState: props.setState}).map((link, index) =>
                <Typography variant="h6">
                    <ListItem key={index}>
                        {link}
                    </ListItem>
                </Typography>
            )}
        </List>
    )
}

const SmallScreenListRendering = (props) => {
    return (
        <SwipeableDrawer anchor="left"
            open={props.open}
            onOpen={() => props.setOpen(true)}
            onClose={() => props.setOpen(false)}
        >
        <DrawerLinkList setState={props.setState}/>
        </SwipeableDrawer>
    )
}

export {BigScreenLinksRendering, SmallScreenListRendering};
