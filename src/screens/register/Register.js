import React, {useState} from 'react';
import './Register.css';
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {register} from "../../api/users";
import {validateContact, validateEmail} from "../../util/validation";

export const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [reqFirstName, setReqFirstName] = useState('no-helper')
    const [lastName, setLastName] = useState('')
    const [reqLastName, setReqLastName] = useState('no-helper')
    const [email, setEmail] = useState('')
    const [reqEmail, setReqEmail] = useState('no-helper')
    const [password, setPassword] = useState('')
    const [reqPassword, setReqPassword] = useState('no-helper')
    const [contact, setContact] = useState('')
    const [reqContact, setReqContact] = useState('no-helper')
    const [message, setMessage] = useState('');

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
        e.target.value === ''
            ? setReqFirstName("helper")
            : setReqFirstName('no-helper');
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
        e.target.value === ''
            ? setReqLastName("helper")
            : setReqLastName('no-helper');
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        e.target.value === '' || !validateEmail(e.target.value)
            ? setReqEmail("helper")
            : setReqEmail('no-helper');
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        e.target.value === ''
            ? setReqPassword("helper")
            : setReqPassword('no-helper');
    }

    const onContactChange = (e) => {
        setContact(e.target.value);
        e.target.value === '' || !validateContact(e.target.value)
            ? setReqContact("helper")
            : setReqContact("no-helper");
    }

    const onSubmit = async (e) => {
        firstName === '' ? setReqFirstName("helper") : setReqFirstName('no-helper');
        lastName === '' ? setReqLastName("helper") : setReqLastName('no-helper');
        email === '' || !validateEmail(email) ? setReqEmail("helper") : setReqEmail('no-helper');
        password === '' ? setReqPassword("helper") : setReqPassword('no-helper');
        contact === '' || !validateContact(contact) ? setReqContact("helper") : setReqContact('no-helper');

        if(firstName === '' || lastName === '' || email === '' || password === '' || contact === '')
            return;

        const data = {
            "emailId": email,
            "firstName": firstName,
            "lastName": lastName,
            "mobile": contact,
            "password": password
        }

        try {
            await register({path: '/register', data});
            setMessage('Registration Successful. Please Login!');
        } catch(err) {
            setMessage(err.message);
        }
    }

    return (
        <div className='form'>
            <div className='form-fields'>
                {/*First Name*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="firstname">
                        First Name
                    </InputLabel>
                    <Input
                        id="firstname"
                        value={firstName}
                        onChange={onFirstNameChange}
                    />
                    <FormHelperText className={reqFirstName}>
                        <span className="red">Please fill out this field</span>
                    </FormHelperText>
                </FormControl>

                {/*Last Name*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="lastname">
                        Last Name
                    </InputLabel>
                    <Input
                        id="lastname"
                        value={lastName}
                        onChange={onLastNameChange}
                    />
                    <FormHelperText className={reqLastName}>
                        <span className="red">Please fill out this field</span>
                    </FormHelperText>
                </FormControl>

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
                        <span className="red">{email === '' ? 'Please fill out this field' : 'Enter valid email'}</span>
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
                        <span className="red">Please fill out this field</span>
                    </FormHelperText>
                </FormControl>

                {/*Contact Number*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="contact">
                        Contact No.
                    </InputLabel>
                    <Input
                        id="contact"
                        value={contact}
                        onChange={onContactChange}
                    />
                    <FormHelperText className={reqContact}>
                        <span className="red">{contact === '' ? 'Please fill out this field' : 'Enter valid mobile number'}</span>
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
                REGISTER
            </Button>
        </div>
    );
}

export default Register;