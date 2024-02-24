import { useUser } from "../../context/userContext"
import { usePosts } from "../../context/postContext"
import { Box, Card, CardContent, CardMedia, Dialog, Grid, IconButton, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ShowPost from '../posts/ShowPost'
import CloseIcon from '@mui/icons-material/Close'

function ProfilePosts() {
    const [selectedPost, setSelectedPost] = useState(null);
    const { user, userProfile, getUserByUsername } = useUser()
    const { posts } = usePosts()
    const { username } = useParams()

    useEffect(() => {
        getUserByUsername(username)
    }, [])

    useEffect(() => {
        getUserByUsername(username)
    }, [posts])

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    let userPosts = []
    if (userProfile) userPosts = posts.filter(post => userProfile.posts.includes(post._id))

    return (
        <>
            <Box>
                <Grid container spacing={0.7} sx={{ mt: 0, p: 0.7 }}>
                    {userPosts.map(post => (
                        <Grid item xs={4} key={post._id}>
                            <Card onClick={() => handlePostClick(post)}
                            sx={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
                                {post.image ?
                                    <CardMedia
                                        component="img"
                                        image={post.image.url}
                                        alt={post.title}
                                        sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', objectFit: 'cover' }}
                                    />
                                    :
                                    <CardContent sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                        <Typography className="text-center" variant="h6" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                                        <Typography className="text-center" variant="subtitle1">{post.description}</Typography>
                                    </CardContent>
                                }
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Dialog 
                open={selectedPost !== null} onClose={handleCloseModal}
                fullWidth
            >
                {selectedPost && <ShowPost post={selectedPost} 
                    onClose={handleCloseModal}
                />}
            </Dialog>
        </>
    )
}

export default ProfilePosts