import { useState, createContext, useContext, useEffect } from "react";
import {
    loginRequest, registerRequest,
    verifyTokenRequest, getUserByUsernameRequest,
    updateUserRequest, updateUserImageRequest,
    deleteUserImageRequest ,checkUsernameRequest
} from "../api/user";
import {
    getNotificationsRequest
} from '../api/notifications'
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
    const [notifications, setNotifications] = useState([])
    const [userProfile, setUserProfile] = useState(null);
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

    const getUserByUsername = async (username) => {
        try {
            const res = await getUserByUsernameRequest(username)
            if (username === res.data.user.username) {
                setUserProfile(res.data.user)
            }
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const checkUsername = async (username) => {
        try {
            const res = await checkUsernameRequest(username)
            return res.status
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const updateUser = async (user) => {
        try {
            setLoading(true)
            const res = await updateUserRequest(user)
            console.log(res)

            setUser(res.data.user)
            setUserProfile(res.data.user)
            return res.status
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserImage = async (user) => {
        try {
            setLoading(true)
            const res = await updateUserImageRequest(user)
            setUser(res.data.user)
            setUserProfile(res.data.user)
            
            return res.status
        } catch (error) {
            console.log(error);
            setErrors(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    const deleteUserImage = async (userId) => {
        try {
            setLoading(true)
            const res = await deleteUserImageRequest(userId)
            setUser(res.data.user)
            setUserProfile(res.data.user)
        } catch (error) {
            console.log(error);
            setErrors(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    const getNotifications = async (userId) => {
        try {
            const res = await getNotificationsRequest(userId)
            setNotifications(res.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
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
            checkAuth,
            getUserByUsername,
            checkUsername,
            updateUser,
            updateUserImage,
            deleteUserImage,
            getNotifications,

            user,
            errors,
            loading,
            isAuthenticated,
            userProfile,
            notifications
        }}>
            {children}
        </UserContext.Provider>
    );
}
