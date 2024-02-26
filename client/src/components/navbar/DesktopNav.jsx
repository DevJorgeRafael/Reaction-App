import { Box, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationBadge from './NotificationBadge';
import MessageBadge from './MessageBadge';

function DesktopNav({ handleProfileMenuOpen, menuId }) {

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>            
            <MessageBadge />
            <NotificationBadge />
            
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
