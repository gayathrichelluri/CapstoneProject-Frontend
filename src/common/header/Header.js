import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import Modal from "../Modal/Modal";
import {AppBar, Button, Typography} from "@material-ui/core";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onLoginClick = () => {
        loggedIn ? setLoggedIn(!loggedIn) : setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
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
            {
                showModal &&
                <Modal
                    open={showModal}
                    close={closeModal}
                    title={'Authentication'}
                />
            }
        </>
    );
}

export default Header;