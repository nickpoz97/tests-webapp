import CreateTest from "../CreateTest";
import CreateQuestion from "../CreateQuestion";
import TestList from "../TestList";
import * as React from "react";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {List, ListItem, Stack, SwipeableDrawer} from "@mui/material";
import Button from "@mui/material/Button";
import {GlobalStyle} from '../../Style/GlobalStyle'


const links = [
    {text: "Home", ref: <TestList/>},
    {text: "Crea Test", ref: <CreateTest/>},
    {text: "Crea AnswerQuestion", ref: <CreateQuestion/>}
]

const StandardLinkList = (props) => {
    const clickHandler = (e) => {
        const index = parseInt(e.target.name)
        props.setState(links[index].ref)
    }

    return links.map(
        (link, index) =>
            <Link name={index} key={index} style={GlobalStyle.linkToHome} onClick={clickHandler}
                  to="#">{link.text}</Link>
    );
}

const BigScreenLinksRendering = (props) => {
    return (
        <Typography variant="h6" sx={{flexGrow: 1}}>
            <Stack direction="row" spacing={5}>
                <StandardLinkList setState={props.setState}/>
            </Stack>
        </Typography>
    )
}

const DrawerLinkList = (props) => {
    const clickHandler = (e) => {
        const index = parseInt(e.target.name)
        props.setState(links[index].ref)
    }

    return (
        <List>
            {links.map((link, index) =>
                <ListItem key={index}>
                    <Button
                        fullWidth
                        sx={{margin: 2}}
                        name={index.toString()}
                        variant="outlined"
                        size="medium"
                        onClick={clickHandler}
                    >
                        {link.text}
                    </Button>
                </ListItem>
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
                         PaperProps={{
                             sx: {width: "70%"}
                         }}
        >
            <DrawerLinkList setState={props.setState}/>
        </SwipeableDrawer>
    )
}

export {BigScreenLinksRendering, SmallScreenListRendering};
