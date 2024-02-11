import { useUser } from "../context/userContext"
import { usePosts } from "../context/postContext"
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function ProfilePosts() {
    const { user, userProfile, getUserByUsername } = useUser()
    const { posts } = usePosts()
    const { username } = useParams()

    useEffect(() => {
        getUserByUsername(username)
    }, [])

    console.log(userProfile)
    // console.log(posts)

    return (
        <>
            <Box>
                <Grid container spacing={0.7} sx={{ mt: 0.5 }}>
                    {posts.map(post => (
                        <Grid item xs={4} key={post._id}>
                            <Card sx={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
                                {post.image ?
                                    <CardMedia
                                        component="img"
                                        image={post.image.url}
                                        alt={post.title}
                                        sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', objectFit: 'cover' }}
                                    />
                                    :
                                    <CardContent sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>{post.title}</Typography>
                                        <Typography variant="subtitle1">{post.description}</Typography>
                                    </CardContent>
                                }
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default ProfilePosts