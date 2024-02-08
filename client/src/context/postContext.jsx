import { useState, createContext, useContext, useEffect } from "react"
import { getPostRequest } from '../api/posts'

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

    useEffect(() => {
        getPosts()
    }, [])

    return <PostContext.Provider value={{
        posts,
        getPosts
    }}>
        {children}
    </PostContext.Provider>
}