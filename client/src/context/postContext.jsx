import { useState, createContext, useContext, useEffect } from "react"
import {
    getPostsRequest, createPostRequest, 
    deletePostRequest, likePostRequest, 
    unlikePostRequest, 
} from '../api/posts'
import { useUser } from "./userContext"
import { io } from 'socket.io-client';
import { useSocket } from "./socketContext";

const PostContext = createContext()

export const usePosts = () => {
    const postContext = useContext(PostContext)
    return postContext
}

export const PostProvider = ({ children }) => {
    const { user } = useUser()
    const socket = useSocket()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (user && socket) {

            getPosts()

            socket.on('posts', (posts) => {
                setPosts(posts);
            });

            socket.on('postCreated', async (post) => {
                console.log('New post created: ', post)
                await getPosts()
            });

            socket.on('postLiked', (updatedPost) => {
                console.log('Post liked: ', updatedPost)
                setPosts(prevPosts => prevPosts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post
                ));
            });


            socket.on('postUnliked', (updatedPost) => {
                console.log('Post unliked: ', updatedPost)
                setPosts(prevPosts => prevPosts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post
                ));
            });


            socket.on('postDeleted', (postId) => {
                console.log('Post deleted: ', postId)
                setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
            });
        }

        return () => {
            if (socket) {
                // socket.disconnect(); NO desconectar el socket aqui
                socket.off('posts');
                socket.off('postCreated');
                socket.off('postLiked');
                socket.off('postUnliked');
                socket.off('postDeleted');
            }
        };
    }, [socket, user]);

    const getPosts = async () => {
        try {
            const res = await getPostsRequest()
            setPosts(res.data)
        } catch (error) {
            console.log('Error getting posts: ', error.message)
        }
    }

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post)
            return res.status
        } catch (error) {
            console.log('Error creating post: ', error.message)
            return null
        }
    }

    const likePost = async (postId, userId) => {
        try {
            const res = await likePostRequest(postId, userId)
            await getPosts()
            return res.data
        } catch (error) {
            console.log('Error liking post: ', error.message)
            return null
        }
    }

    const unlikePost = async (postId, userId) => {
        try {
            const res = await unlikePostRequest(postId, userId)
            await getPosts()
            return res.data
        } catch (error) {
            console.log('Error unliking post: ', error.message)
            return null
        }
    }

    const deletePost = async (postId, userId) => {
        try {
            await deletePostRequest(postId, userId)
            await getPosts()
        } catch (error) {
            console.log('error on deletePostRequest', error.message)
        }
    }


    return <PostContext.Provider value={{
        posts,

        getPosts,
        createPost,
        likePost,
        unlikePost,
        deletePost
    }}>
        {children}
    </PostContext.Provider>
}