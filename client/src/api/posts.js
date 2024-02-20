import axios from './axios.js' 

export const getPostsRequest = async () => await axios.get('/posts')

export const createPostRequest = async (post) => await axios.post('/posts', post)

export const updatePostRequest = async (id, post) => await axios.put(`/posts/${id}`, post)

export const deletePostRequest = async (id, userId) => await axios.delete(`/posts/${id}`, { data: { userId } })

export const getSinglePostRequest = async (id) => await axios.get(`/posts/${id}`)

export const likePostRequest = async (id, userId) => await axios.put(`/posts/${id}/like`, { userId: userId });
    
export const unlikePostRequest = async (id, userId) => await axios.put(`/posts/${id}/unlike`, { userId: userId });