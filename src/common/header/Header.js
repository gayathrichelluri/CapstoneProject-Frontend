import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import Modal from "../modal/Modal";
import {AppBar, Button, Typography} from "@material-ui/core";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import {login, logout} from "../../api/auth";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onLoginClick = () => {
        loggedIn ? onLogout() : setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const onLogin = async (email, password, bookShowId) => {
        const response = await login({path: '/login', accessToken: `Basic ${window.btoa(`${email}:${password}`)}`})
        if(response && response.statusText === 'OK') {
            sessionStorage.setItem('uuid', response.data.id);
            sessionStorage.setItem('access-token', response.data.accessToken);
            setLoggedIn(true);
            setShowModal(false);
        } else {
            throw(response);
        }
    }

    const onLogout = async () => {
        const response = await logout({path: '/logout', accessToken: sessionStorage.getItem('access-token')});
        if(response && response.statusText === 'OK') {
            sessionStorage.removeItem('uuid');
            sessionStorage.removeItem('access-token');
            setLoggedIn(false);
            navigate('/');
        } else {
            throw(response);
        }
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
                    tabs={['Login', 'Register']}
                    tabActions={{
                        Login: <Login onLogin={onLogin}/>,
                        Register: <Register/>
                    }}
                />
            }
        </>
    );
}

export default Header;