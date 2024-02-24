import { useEffect, useState, useSyncExternalStore } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, Popover, Box, Dialog } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ShowNotification } from '../notifications/ShowNotification';
import { useNotification } from '../../context/notificationContext';
import ShowPost from '../posts/ShowPost';
import { useNavigate } from 'react-router-dom';

function NotificationBadge({ needText }) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [localNotifications, setLocalNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null)
    const { notifications, readNotifications,
        removeNotifications, readNotification
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

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    const handleReadNotification = (notification) => {
        if(notification.type === 'follow') {
            handleMenuClose();
            handleClose();
            navigate(`/profile/${notification.fromUser.username}`);
        }
        else if (notification.type === 'like') setSelectedPost(notification.target.post)
        readNotification(notification._id);
    }

    useEffect(() => {
        setLocalNotifications(notifications);
    }, [notifications]);

    useEffect(() => {
        const unreadCount = localNotifications.filter(notification => !notification.read).length;
        setUnreadNotifications(unreadCount);
    }, [localNotifications, unreadNotifications]);

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


                        {localNotifications.length > 0 &&
                            <>
                                <IconButton onClick={handleMenuClick} >
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    {unreadNotifications > 0 &&
                                        <MenuItem onClick={handleReadAllNotifications}>
                                            Mark all as read
                                        </MenuItem>}

                                    <MenuItem onClick={handleRemoveAllNotifications}
                                        sx={{ color: theme => theme.palette.error.main }}
                                    >
                                        Delete all notifications
                                    </MenuItem>

                                </Menu>
                            </>}
                    </Box>
                    {localNotifications.length > 0 ? (
                        localNotifications.map((notification, index) => (
                            <Box onClick={() => handleReadNotification(notification)} key={notification._id}>
                                <ShowNotification notification={notification} bg={true} />
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            height: 400, padding: 3,
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


            <Dialog
                open={selectedPost !== null} onClose={handleCloseModal}
                fullWidth
            >
                {selectedPost && <ShowPost post={selectedPost}
                    onClose={handleCloseModal}
                />}
            </Dialog>
        </>
    );
}

export default NotificationBadge;
