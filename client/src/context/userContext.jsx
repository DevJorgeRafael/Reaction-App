import { useState, createContext, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/user";
import Cookies from 'js-cookie'

const UserContext = createContext();

export const useUser = () => {
    const userContext = useContext(UserContext);
    return userContext;
}

export const UserProvider = ({ children }) => {
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
        try {
            setLoading(true);
            const res = await loginRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true)
            setLoading(false)
            console.log(res.data.user)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
            setLoading(false)
        }
    }

    const checkAuth = async () => {
        const cookies = Cookies.get()
        if (!cookies.token) {
            setIsAuthenticated(false)
            setLoading(false)
            return setUser(null)
        }
        try {
            const res = await verifyTokenRequest(cookies.token)
            if (!res.data) {
                setIsAuthenticated(false)
                setLoading(false)
                return
            }

            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return <UserContext.Provider value={{
        register,
        login,
        user,

        errors,
        loading,
        isAuthenticated
        
    }}>
        {children}
    </UserContext.Provider>

}