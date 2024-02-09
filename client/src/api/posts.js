import axios from './axios.js' 

export const getPostRequest = async () => await axios.get('/posts')

export const createPostRequest = async (post) => await axios.post('/posts', post)

export const updatePostRequest = async (id, post) => await axios.put(`/posts/${id}`, post)

export const deletePostRequest = async (id) => await axios.delete(`/posts/${id}`)

export const getSinglePostRequest = async (id) => await axios.get(`/posts/${id}`)

export async function likePostRequest(id, userId) {
    try {
        return await axios.put(`/posts/${id}/like`, { userId: userId });
    } catch (error) {
        console.error(error);
    }
}

export async function unlikePostRequest(id, userId) {
    try {
        return await axios.put(`/posts/${id}/unlike`, { userId: userId });
    } catch (error) {
        console.error(error);
    }
}
