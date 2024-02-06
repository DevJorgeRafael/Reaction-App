import { useState, createContext, useContext } from "react"
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
        console.log(res)
    }

    return <PostContext.Provider value={{
        posts,
        getPosts
    }}>
        {children}
    </PostContext.Provider>
}