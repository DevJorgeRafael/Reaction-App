import { useState, createContext } from "react"

export const PostContext = createContext()

export const PostContainer = ({children}) => {

    const [posts, setPosts] = useState([])

    return <PostContext.Provider value={{
        posts,
        setPosts
    }}>
        {children}
    </PostContext.Provider>
}