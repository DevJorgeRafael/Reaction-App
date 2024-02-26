import { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/notificationContext';
import ShowChat from '../messages/ShowChat';

export const ShowNotification = ({ notification, bg }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const { readNotification, removeNotification } = useNotification();
    let message;

    switch (notification.type) {
        case 'like':
            message = 'has liked your post';
            break;
        case 'follow':
            message = `has started following you`;
            break;
        case 'message':
            message = `has sent you a message`;
            break;
        default:
            message = '';
    }


    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAsRead = () => {
        readNotification(notification._id);
        handleMenuClose();
    };

    const handleDelete = () => {
        removeNotification(notification._id);
        handleMenuClose();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };


    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: bg ? (notification.read ? 'initial' : theme => alpha(theme.palette.primary.dark, 0.2)) : undefined,
                '&:hover': {
                    backgroundColor: "#B4D4FF",

                }
            }}
            onClick={notification.type === 'message' ? handleClickOpen : undefined}
        >
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <Avatar src={notification.fromUser.image?.url}
                        alt={notification.fromUser.username}
                        sx={{ height: 50, width: 50, cursor: 'pointer' }}
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/profile/${notification.fromUser.username}`);
                        }}
                    />
                </Box>
                <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="initial" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                            @{notification.fromUser.username}
                        </Box>
                        <Typography variant="body2" color="initial" component="span">{message}</Typography>
                        <Box component="span" sx={{ fontWeight: 'bold', mx: 1 }}>
                            {notification.target.post?.title}
                            {notification.target.message?.content}
                        </Box>
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#757575', display: 'flex', justifyContent: 'flex-end' }}>
                        {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                    </Typography>
                </Box>
            </Box>

            <ShowChat handleClose={handleClose} user={notification.user} userProfile={notification.fromUser} open={open} />

            {bg && <>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {!notification.read && <MenuItem onClick={handleMarkAsRead}>Mark as read</MenuItem>}
                    <MenuItem onClick={handleDelete}
                        sx={{ color: 'error.main' }}
                    >
                        Delete this
                    </MenuItem>
                </Menu>
            </>}
        </Box>
    );
};
