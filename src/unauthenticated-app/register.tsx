import { useAuth } from 'context/auth-context';
import React from 'react'

export default function RegisterScreen() {

    const {register} = useAuth()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
        register({username,password})
    }

    
    return (
        <form onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor="username">username</label>
                <input type="text" id={'username'} />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="password" id={'password'} />
            </div>
            <button type={'submit'}>Register</button>
        </form>
    )
}
