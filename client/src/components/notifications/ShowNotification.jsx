import { Box, Avatar, Typography } from '@mui/material';
import { alpha } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const ShowNotification = ({ notification, bg }) => {
    const navigate = useNavigate()
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
        <Box
            sx={{
                p: 1,
                display: 'flex',
                width: '100%',
                backgroundColor: bg ? (notification.read ? 'initial' : '#f5f5f5') : undefined,
                '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.1)
                }
            }}

        >
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <Avatar src={notification.fromUser.image?.url}
                    alt={notification.fromUser.username}
                    sx={{ height: 50, width: 50, cursor: 'pointer' }}
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
};
