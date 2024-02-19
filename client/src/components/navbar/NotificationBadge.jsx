import { useEffect, useReducer, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Avatar, Typography, Popover, Box, alpha } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSocket } from '../../hooks/useSocket';
import { formatDistanceToNow } from 'date-fns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

function NotificationBadge({ needText }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const notifications = useSocket();


    const unreadNotifications = notifications.filter(notification => !notification.read).length;
    console.log(unreadNotifications)

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log('Rendering NotificationBadge with notifications:', notifications);
        forceUpdate()
    }, [notifications, unreadNotifications]);

    return (
        <>
            <IconButton
                size="large"
                color="inherit"
                onClick={handleClick}
                sx={{ borderRadius: 0 }}
            >
                <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon />
                </Badge>
                {needText && <Typography variant="body1" sx={{ ml: 2 }}>Notifications</Typography>}
            </IconButton>

            {notifications.length > 0 &&
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" color="initial"
                            sx={{ p: 2 }}
                        >Notifications</Typography>
                        <IconButton aria-label="" >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                    {notifications.map((notification, index) => {
                        let message;
                        switch (notification.type) {
                            case 'like':
                                message = 'has liked your post';
                                break;
                            case 'follow':
                                message = `${notification.fromUser.username} has started following you`;
                                break;
                            default:
                                message = '';
                        }
                        return (
                            <Box key={index}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    width: 400,
                                    backgroundColor: notification.read ? 'initial' : '#f5f5f5',
                                    '&:hover': {
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1)
                                    }
                                }}
                            >

                                <Box sx={{ mr: 1 }}>
                                    <Avatar src={notification.fromUser.image?.url}
                                        alt={notification.fromUser.username}
                                        sx={{ height: 75, width: 75, cursor: 'pointer' }}
                                        onClick={() => navigate(`/profile/${notification.fromUser.username}`)}
                                    />
                                </Box>
                                <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="initial" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1, cursor: 'pointer' }}
                                            onClick={() => navigate(`/profile/${notification.fromUser.username}`)}
                                        >
                                            {notification.fromUser.username}
                                        </Box>
                                        <Typography variant="body2" color="initial" component="span">{message}</Typography>
                                        <Box component="span" sx={{ fontWeight: 'bold', mx: 1 }}>
                                            {notification.target.post?.title}
                                        </Box>
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#757575', display: 'flex', justifyContent: 'flex-end' }}>
                                        {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                                    </Typography>
                                </Box>


                            </Box>
                        );
                    })}
                </Popover>
            }
        </>
    );
}

export default NotificationBadge;
