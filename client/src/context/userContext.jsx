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
    const [loading, setLoading] = useState(false); // Estado de carga para autenticación

    const register = async (user) => {
        try {
            setLoading(true); // Iniciar carga
            const res = await registerRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        } finally {
            setLoading(false); // Detener carga
        }
    }

    const login = async (user) => {
        try {
            setLoading(true); // Iniciar carga
            const res = await loginRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        } finally {
            setLoading(false); // Detener carga
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
