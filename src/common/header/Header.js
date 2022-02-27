import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import {AppBar, Button, Typography} from "@material-ui/core";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const onLoginClick = () => {
        setLoggedIn(!loggedIn);
    }

    return (
        <AppBar className={"header"} position={"sticky"}>
            <div className={"title-block"}>
                <img src={logo} alt="logo" className="logo-image"/>
                <Typography variant={"h6"}>Doctor Finder</Typography>
            </div>
            <div className={"auth-block"}>
                <Button
                    variant={"contained"}
                    color={loggedIn ? "secondary" : "primary"}
                    onClick={onLoginClick}
                >
                    {loggedIn ? 'LOGOUT' : 'LOGIN'}
                </Button>
            </div>

        </AppBar>
    );
}

export default Header;