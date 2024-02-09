import { usePosts } from '../context/postContext'
import { useUser } from '../context/userContext';
import { Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, useFormControl, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Masonry from 'react-masonry-css'
import { VscEmptyWindow } from 'react-icons/vsc'
import '../styles/post.css'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react';

function PostsPage() {
    const { posts } = usePosts()
    const { user } = useUser()

    if (posts.length === 0) return (
        <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>

            <VscEmptyWindow size={200} />
            <h1>There are no posts yet</h1>
        </div>
    )

    const breakpointColumnsObj = {
        default: 2,
        1100: 2,
        700: 2,
        600: 1
    };

    return (
        <div style={{ padding: '20px' }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {posts.map((post, index) => (
                    <div key={post._id}>
                        <Card sx={{ maxWidth: 565}}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                        {post.user && post.user.name ? post.user.name[0] : post.user.username[0]}
                                    </Avatar>
                                }
                                action={
                                    user._id === post.user._id && (
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }
                                title={post.user.name}
                                subheader={formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                sx={{ pb: 0, mb: -1 }}
                            />

                            <CardContent sx={{ pt: 1.2 }}>
                                <Typography variant="h6" color="text.primary">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                            </CardContent>

                            {post.image &&
                                <CardMedia
                                    component="img"
                                    sx={{ maxHeight: 250, height: 250, objectFit: 'cover', mt: -1 }} // Reduce el margen superior
                                    image={post.image.url}
                                    alt={post.title}
                                />
                            }
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>

                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default PostsPage;
