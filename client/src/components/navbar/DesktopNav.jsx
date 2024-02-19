import { useEffect, useState } from 'react';
import { Box, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationBadge from './NotificationBadge';
import { useSocket } from '../../hooks/useSocket'; 

function DesktopNav({ handleProfileMenuOpen, menuId }) {
    const [updateCount, setUpdateCount] = useState(0);
    const { notifications } = useSocket();

    useEffect(() => {
        setUpdateCount(updateCount + 1);
    }, [notifications]);

    // Luego, puedes usar updateCount como una dependencia en useEffect para forzar el renderizado


    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton 
            size="large"
            color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            
            <NotificationBadge key={updateCount}/>
            
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </Box>
    );
}

export default DesktopNav;
