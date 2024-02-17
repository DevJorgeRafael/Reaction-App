import { useEffect, useRef, useState } from "react"
import { useUser } from "../../context/userContext"
import { Avatar, Badge, Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useParams } from "react-router-dom"
import UpdateUserImageModal from "./UploadUserImageModal"
import CircularIndeterminate from '../CircularIndeterminate'
import EditProfile from "./EditProfile"

function ProfileInformation() {
    const { user, userProfile, getUserByUsername, loading } = useUser()
    const { username } = useParams()

    useEffect(() => {
        getUserByUsername(username)
    }, [])

    useEffect(() => {
        // Cada vez que cambia userProfile, este efecto se ejecutará,
        // lo que provocará que el componente se vuelva a renderizar con la información actualizada.
    }, [userProfile]);

    return (
        userProfile ? (
            <Card sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#E1F0DA' }} >
                <CardContent sx={{ p: 2 }}>
                    <Box className="image d-flex flex-column justify-content-center align-items-center">
                        <Box>
                            <Typography variant="h5" color="initial"
                                sx={{ p: 1, fontWeight: 'bold' }}
                            >@{userProfile.username}</Typography>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                   userProfile._id === user._id && 
                                   <UpdateUserImageModal/>
                                }
                            >
                                <Avatar alt={userProfile.username} src={userProfile.image?.url}
                                    sx={{
                                        justifyContent: 'center',
                                        width: 150,
                                        height: 150,
                                    }}
                                />
                            </Badge>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" color="initial" className="mt-2 fw-bold">{userProfile.name}</Typography>
                            <Typography variant="h6" color="initial" className="mt-2">
                                {userProfile.bio ? userProfile.bio : (
                                    userProfile._id === user._id && 'You have not set a bio yet.'
                                )}
                            </Typography>

                            {userProfile._id === user._id ?
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <EditProfile user={ user } />
                                </Box> :
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: '#4F6F52',
                                            '&:hover': {
                                                background: '#739072',
                                            },
                                            '&:active': {
                                                background: '#739072',
                                            },
                                        }}
                                    >
                                        Follow
                                    </Button>
                                </Box>
                            }

                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                    <Typography variant="subtitle1" color="initial">Posts</Typography>
                                    <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{userProfile.posts.length}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                    <Typography variant="subtitle1" color="initial">Followers</Typography>
                                    <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{userProfile.followers.length}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                    <Typography variant="subtitle1" color="initial">Following</Typography>
                                    <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{userProfile.following.length}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card >) : (
            <CircularIndeterminate />
        )
    )
}

export default ProfileInformation
