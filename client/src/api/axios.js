import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default instance
