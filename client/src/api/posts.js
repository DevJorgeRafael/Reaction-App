import axios from 'axios' 

export const getPostRequest = async () => await axios.get('/posts')