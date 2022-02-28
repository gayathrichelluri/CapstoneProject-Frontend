import React, {useState} from 'react';
import './Login.css';
import {FormControl, FormHelperText, InputLabel, Input, Button} from "@material-ui/core";

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('')
    const [reqEmail, setReqEmail] = useState('no-helper')
    const [password, setPassword] = useState('')
    const [reqPassword, setReqPassword] = useState('no-helper')
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onEmailChange = (e) => {
        const value = e.target.value
        setEmail(value);
        email === '' || !validateEmail(value)
            ? setReqEmail("helper")
            : setReqEmail('no-helper');
    }

    const onPasswordChange = (e) => {
        const value = e.target.value
        setPassword(value);
        value === ''
            ? setReqPassword("helper")
            : setReqPassword('no-helper');
    }

    const onSubmit = (e) => {
        let isInvalid = false;
        if (email === '' || !validateEmail(email)) {
            setReqEmail("helper");
            isInvalid = true;
        } else setReqEmail('no-helper');

        if(password === '') {
            setReqPassword("helper");
            isInvalid = true;
        } else setReqPassword('no-helper');

        try {
            if(isInvalid)
                throw new Error('Please fill out the fields with valid values.');

            setMessage('');
            onLogin(email, password);
        } catch(err) {
            setMessage(err.message);
        }
    }

    return (
        <div className='form'>
            <div className='form-fields'>
                {/*Email*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="email">
                        Email
                    </InputLabel>
                    <Input
                        id="email"
                        value={email}
                        type="email"
                        onChange={onEmailChange}
                    />
                    <FormHelperText className={reqEmail}>
                        <span className="red">{email === '' ? 'Required' : 'Enter valid email'}</span>
                    </FormHelperText>
                </FormControl>

                {/*Password*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="password">
                        Password
                    </InputLabel>
                    <Input
                        id="password"
                        value={password}
                        type="password"
                        onChange={onPasswordChange}
                    />
                    <FormHelperText className={reqPassword}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>
            </div>
            {setMessage && <div className='message'>{message}</div>}
            <Button
                variant="contained"
                onClick={onSubmit}
                color="primary"
                className={setMessage ? 'message' : 'submit'}
            >
                LOGIN
            </Button>
        </div>
    );
}

export default Login;