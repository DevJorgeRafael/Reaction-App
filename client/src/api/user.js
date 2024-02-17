import axios from './axios.js'

export const registerRequest = async (user) => await axios.post('/register', user)

export const loginRequest = async (user) => await axios.post('/login', user)

export const verifyTokenRequest = async () => await axios.get('/verifyToken')

export const getUserByUsernameRequest = async (username) =>
    await axios.get(`/username/${username}`)

export const checkUsernameRequest = async (username) => 
    await axios.get(`/checkUsername/${username}`)

export const updateUserRequest = async (user) => await axios.put(`/updateUser/${user.username}`, user)

export const updateUserImageRequest = async (user) =>
    await axios.put('/updateUserImage', user, { transformRequest: [] });

export const deleteUserImageRequest = async (userId) => await axios.delete('/deleteUserImage', {data: {userId}})