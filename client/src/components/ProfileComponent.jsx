import { useUser } from "../context/userContext"
import { Avatar, Badge, Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

function ProfileComponent() {
    const { user } = useUser()

    return (
        <Card sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#E1F0DA' }}>
            <CardContent sx={{ p: 2 }}>
                <Box className="image d-flex flex-column justify-content-center align-items-center">
                    <Box>
                        <Typography variant="h5" color="initial"
                            sx={{ p: 1, fontWeight: 'bold' }}
                        >@{user.username}</Typography>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <IconButton>
                                    <PhotoCameraIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                            }
                        >
                            <Avatar alt={user.username} src={user.image?.url}
                                sx={{
                                    justifyContent: 'center',
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        </Badge>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" color="initial" className="mt-2 fw-bold">{user.name}</Typography>
                        <Typography variant="h6" color="initial" className="mt-2">{user.bio ? user.bio : 'You have not set a bio yet.'}</Typography>

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
                                Edit Profile
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', mt: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                <Typography variant="subtitle1" color="initial">Posts</Typography>
                                <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{user.posts.length}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                <Typography variant="subtitle1" color="initial">Followers</Typography>
                                <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{user.followers.length}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mx: 2 }}>
                                <Typography variant="subtitle1" color="initial">Following</Typography>
                                <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>{user.following.length}</Typography>
                            </Box>
                        </Box>
                    </Box>


                </Box>
            </CardContent>
        </Card>


    )
}

export default ProfileComponent
