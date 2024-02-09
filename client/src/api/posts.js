import axios from './axios.js' 

export const getPostRequest = async () => await axios.get('/posts')

export const createPostRequest = async (post) => await axios.post('/posts', post)

export const updatePostRequest = async (id, post) => await axios.put(`/posts/${id}`, post)

export const deletePostRequest = async (id) => await axios.delete(`/posts/${id}`)

export const getSinglePostRequest = async (id) => await axios.get(`/posts/${id}`)

export const likePostRequest = async (id) => await axios.put(`/posts/${id}/like`)

