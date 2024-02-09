import { useState, createContext, useContext, useEffect } from "react"
import { getPostRequest, createPostRequest, deletePostRequest, likePostRequest } from '../api/posts'

const PostContext = createContext()

export const usePosts = () => {
    const postContext = useContext(PostContext)
    return postContext
}

export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await getPostRequest()
        setPosts(res.data)
    }

    const createPost = async (post) => {
        console.log(post)
        const res = await createPostRequest(post)
        console.log(res)
        getPosts()
    }

    useEffect(() => {
        getPosts()
    }, [])

    return <PostContext.Provider value={{
        posts,

        getPosts,
        createPost,
    }}>
        {children}
    </PostContext.Provider>
}