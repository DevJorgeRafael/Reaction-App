import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default instance;