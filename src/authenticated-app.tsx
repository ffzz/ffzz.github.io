import { useAuth } from 'context/auth-context'
import React from 'react'
import { ProjectListScreen } from 'screens/project-list'

const AuthenticatedApp = () => {

    const { logout } = useAuth()

    return (
        <div>
            <button onClick={e => logout}>Log out</button>
            <ProjectListScreen />
        </div>
    )
}

export default AuthenticatedApp
