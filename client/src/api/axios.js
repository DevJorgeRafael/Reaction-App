import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:4000/api/' : 
        'https://reaction-app.up.railway.app/api',
    withCredentials: true
})

export default instance;
