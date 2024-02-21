import { useState, createContext, useContext, useEffect } from "react";
import {
    loginRequest, registerRequest,
    verifyTokenRequest, getUserByUsernameRequest,
    updateUserRequest, updateUserImageRequest,
    deleteUserImageRequest ,checkUsernameRequest,
    getUsersRequest, getUsersByUsernameRequest
} from "../api/user";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"; 

const UserContext = createContext();

export const useUser = () => {
    const userContext = useContext(UserContext);
    return userContext;
}

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
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
        const socket = io('http://localhost:4000')
        socket.emit('logout', user._id)
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

    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsersByUsername = async (username) => {
        try {
            const res = await getUsersByUsernameRequest(username)
            setUsers(res.data)
        } catch (error) {
            console.log(error)
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
            getUsers,
            getUsersByUsername,

            user,
            users,
            errors,
            loading,
            isAuthenticated,
            userProfile,
        }}>
            {children}
        </UserContext.Provider>
    );
}
