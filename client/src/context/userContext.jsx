import { useState, createContext, useContext, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/user"; 
import Cookies from 'js-cookie'

const UserContext = createContext();

export const useUser = () => {
    const userContext = useContext(UserContext);
    return userContext;
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const register = async (user) => {
        const res = await registerRequest(user);
        console.log(res.data)
        setUser(res.data);
    }

    const login = async (user) => {
        const res = await loginRequest(user);
        setUser(res.data);
    }

    const checkAuth = async (user) => {
        const token = Cookies.get('token')
        if (token) {
            setIsAuthenticated(true)
        }
        setLoading(false)
    
    }

    return <UserContext.Provider value={{
        user,
        register,
        login
    }}>
        {children}
    </UserContext.Provider>

}