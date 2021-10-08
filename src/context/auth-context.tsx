import React, { ReactNode, useState } from 'react'
import { LoginUser } from 'utils/auth-provider';
import * as auth from 'utils/auth-provider'
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useFetch } from 'utils';

interface AuthContext {
    user: User | null;
    register: (form: LoginUser) => Promise<void>;
    login: (form: LoginUser) => Promise<void>;
    logout: () => Promise<void>;
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me',{token})
        user = data.user
    }
    return user
}




const AuthContext = React.createContext<AuthContext | undefined>(undefined);

 const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null)

    const login = (form: LoginUser) => auth.login(form).then(user => setUser({...user}))
    const register = (form: LoginUser) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    useFetch(() => {
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used in AuthProvider')
    }
    return context
}

export {
    useAuth,
    AuthContext,
    AuthProvider
}