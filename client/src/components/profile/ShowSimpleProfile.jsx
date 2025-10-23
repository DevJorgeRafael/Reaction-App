import { Avatar, Badge, Box, Button, Typography } from "@mui/material"
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useState } from "react";
import ShowChat from "../messages/ShowChat";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export const ShowSimpleProfile = ({ user }) => {
    const { user: ItsMe } = useUser()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center',
            my: 1, pl: 1, py: 1, borderRadius: 2,
            backgroundColor: 'white', justifyContent: 'space-between'
        }}>
            <Box sx={{
                display: 'flex',
            }}>
                <Badge overlap="circular" badgeContent="+" color="primary">
                    <Avatar
                        src={user.image?.url}
                        alt={user.username}
                        sx={{ height: 60, width: 60, cursor: 'pointer' }}
                        onClick={() => navigate(`/profile/${user.username}`)}
                    />
                </Badge>
                <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', padding: 1 }}>
                    <Typography variant="body2" color="initial">
                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1, cursor: 'pointer' }}
                            onClick={() => navigate(`/profile/${user.username}`)}
                        >
                            @{user.username}
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="initial">
                        {user.name}
                    </Typography>

                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" sx={{ mr: 1 }}>Follow</Button>
                <Button variant="contained" sx={{ mr: 1 }}
                    onClick={handleClickOpen}
                >
                    <ChatBubbleIcon />
                </Button>
            </Box>

            <ShowChat handleClose={handleClose} user={ItsMe} userProfile={user} open={open} />

        </Box>
    )
}
