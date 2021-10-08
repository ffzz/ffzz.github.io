
import React from 'react'
import {useState} from 'react';
import { register } from 'utils/auth-provider';
import LoginScreen from './login';
import RegisterScreen from './register';

const UnauthenticatedApp = () => {

    const [isRegister, setIsRegister] = useState(false)

    return (
        <div>
            {
                isRegister ? <LoginScreen /> : <RegisterScreen />
            }
            <button onClick={ () => setIsRegister(!isRegister)}>Switch to {isRegister? 'Register' : "Log in"}</button>
        </div>
    )
}

export default UnauthenticatedApp


