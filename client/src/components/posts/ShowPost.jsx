// En ShowPost.jsx

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography, Avatar, Box, Menu, MenuItem, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from 'date-fns';

import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/postContext';

function ShowPost({ post }) {
    const { likePost, unlikePost, deletePost, getPosts, posts } = usePosts();
    const { user } = useUser();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [localPost, setLocalPost] = useState(post); 

    const handleOpenOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = async (post) => {
        handleCloseOptions();
        toast(
            (t) => (
                <div className='d-flex align-items-center flex-column'>
                    <b className="text-white mb-2">
                        Are you sure to delete this?
                    </b>
                    <div>
                        <Button
                            variant='contained'
                            onClick={() => toast.dismiss(t.id)}
                            sx={{
                                mr: 2,

                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={async (e) => {
                                const res = await deletePost(post._id, post.user._id);
                                toast.dismiss(t.id);
                            }}
                            sx={{
                                color: 'white',
                                backgroundColor: 'red',
                                borderRadius: 1,
                                boxShadow: 2,
                                '&:hover': {
                                    backgroundColor: '#FF0000',
                                }
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                </div>
            ),
            {
                duration: "700",
                style: {
                    background: "#96B6C5"
                }
            }
        );
    };

    const handleLikePost = async () => {
        try {
            if (localPost.likes.includes(user._id)) {
                setLocalPost(await unlikePost(localPost._id, user._id))
            } else {
                setLocalPost(await likePost(localPost._id, user._id))
            }
        } catch (error) {
            console.error('Error on like to post:', error);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar onClick={() => navigate(`/profile/${localPost.user.username}`)} sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
                        {localPost.user && localPost.user.username ? localPost.user.username[0].toUpperCase() : 'U'}
                    </Avatar>
                }
                action={
                    user._id === localPost.user._id && (
                        <>
                            <IconButton aria-label="settings" onClick={handleOpenOptions}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseOptions}
                            >
                                <MenuItem onClick={() => { handleDeletePost(localPost) }}>Delete Post</MenuItem>
                            </Menu>
                        </>
                    )
                }
                title={
                    <Box onClick={() => navigate(`/profile/${localPost.user.username}`)}>
                        <b>@{localPost.user.username}</b>
                    </Box>
                }
                subheader={
                    <Box onClick={() => navigate(`/profile/${localPost.user.username}`)}>
                        {localPost.user.name}
                    </Box>
                }
                sx={{ pb: 0, mb: -1 }}
            />

            <CardContent sx={{ pt: 1.2 }}>
                <Typography variant="h6" color="text.primary">
                    {localPost.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {localPost.description}
                </Typography>
            </CardContent>

            {localPost.image &&
                <CardMedia
                    component="img"
                    sx={{ maxHeight: 250, height: 250, objectFit: 'scale-down', mt: -1 }} // Reduce el margen superior
                    image={localPost.image.url}
                    alt={localPost.title}
                />
            }
            <CardActions sx={{ mt: -1, justifyContent: 'space-between' }}>
                <Box >
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleLikePost}
                    >
                        <FavoriteIcon color={localPost.likes.includes(user._id) ? "error" : "default"} />
                        <Typography variant="body2" color="text.secondary">
                            {localPost.likes.length}
                        </Typography>
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </Box>

                <Typography variant="body2" sx={{ color: '#757575', mr: 2 }}>
                    {formatDistanceToNow(new Date(localPost.date), { addSuffix: true })}
                </Typography>
            </CardActions>
        </Card>
    );
}

export default ShowPost;

