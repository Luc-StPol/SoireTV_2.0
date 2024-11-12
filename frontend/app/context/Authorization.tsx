'use client'

import {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
    isAuthentificated: boolean,
    login: (token:string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false)

    useEffect(() => {
        const token = Cookies.get('token')
        setIsAuthentificated(!!token)
    }, [])

    const login = (token: string) => {
        Cookies.set('token', token, {expires: 7, path:'/'})
        setIsAuthentificated(true)
    }
    
    const logout = () => {
        Cookies.remove('token', {path: '/'})
        setIsAuthentificated(false)
    }

    return (
        <AuthContext.Provider value={({ isAuthentificated, login, logout})}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =():AuthContextType => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}



    
