// NotificationBadge.jsx
import { useEffect, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useUser } from '../../context/userContext';

function NotificationBadge() {
    const { user, getNotifications, notifications } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (user) getNotifications(user._id)
    }, [user])

    // Contar el número de notificaciones no leídas
    const unreadNotifications = notifications.filter(notification => !notification.read).length;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(notifications)

    return (
        <>
            <IconButton
                size="large"
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            {notifications.length > 0 &&
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ zIndex: 1002 }}
                >
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
                            <MenuItem key={index} onClick={handleClose}>
                                <Avatar src={notification.fromUser.image?.url} alt={notification.fromUser.username} sx={{height: 75, width: 75}}/>
                                <Typography variant="body2" color="initial"
                                    sx={{mr: 2, fontWeight: 'bold'}}
                                >{notification.fromUser.username}</Typography>
                                <Typography variant="body2" color="initial">{message}</Typography>
                                
                            </MenuItem>
                        );
                    })}
                </Menu>
            }
        </>
    );
}

export default NotificationBadge;
