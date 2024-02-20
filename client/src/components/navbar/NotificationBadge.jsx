import { useEffect, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, Popover, Box } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ShowNotification } from '../notifications/showNotification';
import { useNotification } from '../../context/notificationContext';

function NotificationBadge({ needText }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [localNotifications, setLocalNotifications] = useState([])
    const { notifications, readNotifications, 
        removeNotifications 
    } = useNotification();

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };
    
    const handleReadAllNotifications = () => {
        setMenuAnchorEl(null);
        readNotifications(notifications[0].user._id);
    }
    
    const handleRemoveAllNotifications = () => {
        handleMenuClose();
        handleClose();
        if (notifications.length > 0) {
            removeNotifications(notifications[0].user._id);
        }
    };

    useEffect(() => {
        setLocalNotifications(notifications);  
    }, [notifications]);
    const unreadNotifications = localNotifications.filter(notification => !notification.read).length;
    
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
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" color="initial"
                            sx={{ p: 2 }}
                            onClick={handleClose}
                        >Notifications</Typography>

                        <IconButton onClick={handleMenuClick} >
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleReadAllNotifications}>
                                Mark all as read
                            </MenuItem>
                            <MenuItem onClick={handleRemoveAllNotifications}
                                sx={{ color: theme => theme.palette.error.main }}
                            >
                                Delete all notifications
                            </MenuItem>

                        </Menu>
                    </Box>
                    {localNotifications.length > 0 ? (
                        localNotifications.map((notification, index) => (
                            <ShowNotification key={index} notification={notification} bg={true}/>
                        ))
                    ) : (
                        <Box sx={{ height: 400, padding: 3,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'column',
                            backgroundColor: theme => theme.palette.grey[300]
                        }}>
                            <NotificationsOffIcon color="disabled" style={{ fontSize: 100 }} />
                            <Typography variant="h6">You don't have any notifications yet.</Typography>
                        </Box>
                    )}

                </Box>
            </Popover>
        </>
    );
}

export default NotificationBadge;
