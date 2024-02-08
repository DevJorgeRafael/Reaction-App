import axios from './axios.js'

export const registerRequest = async (user) => {
    return await axios.post('/register', user)
}

export const loginRequest = async () => {
    return await axios.post('/login')
}