import { usePosts } from "../context/postContext"
import { useUser } from "../context/userContext"

function ProfileComponent() {
    const { user } = useUser()
    const { posts } = usePosts()
    if(user.image) console.log(user)

    return (
        <>
            <h1>Profile Component</h1>
            <div>
                
            </div>
        </>
    )
}

export default ProfileComponent