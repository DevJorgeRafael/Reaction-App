import { useState, createContext, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/user";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
    const userContext = useContext(UserContext);
    return userContext;
}

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 10000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    const register = async (user) => {
        try {
            setLoading(true); 
            const res = await registerRequest(user);
            console.log(res)
            setUser(res.data.user);
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        } finally {
            setLoading(false); 
        }
    }

    const login = async (user) => {
        try {
            setLoading(true); 
            const res = await loginRequest(user);
            console.log(res)
            setUser(res.data.user);
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        } finally {
            setLoading(false); 
        }
    }

    const logout = async () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
        navigate('/login')
    }

    const checkAuth = async () => {
        const cookies = Cookies.get()
        if (!cookies.token) {
            setIsAuthenticated(false)
            return setUser(null)
        }
        try {
            const res = await verifyTokenRequest(cookies.token)
            if (!res.data) {
                setIsAuthenticated(false)
                return
            }
            setIsAuthenticated(true)
            setUser(res.data.user)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
        }
    }



    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <UserContext.Provider value={{
            register,
            login,
            logout,
            user,
            errors,
            loading,
            isAuthenticated,
            setIsAuthenticated // Si es necesario para otros componentes
        }}>
            {children}
        </UserContext.Provider>
    );
}
