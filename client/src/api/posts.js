import axios from './axios.js' 

export const getPostRequest = async () => await axios.get('/posts')