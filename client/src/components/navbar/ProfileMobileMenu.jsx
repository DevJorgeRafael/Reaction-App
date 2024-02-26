import { Menu, MenuItem, IconButton, Badge, Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationBadge from './NotificationBadge';
import MessageBadge from './MessageBadge';

function ProfileMobileMenu({ mobileMoreAnchorEl, handleMobileMenuClose, handleProfileMenuOpen }) {

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu-mobile"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(mobileMoreAnchorEl)}
            onClose={handleMobileMenuClose}
            sx={{ zIndex: 1000 }}
        >
            <MenuItem>
                <MessageBadge
                    needText={true}
                />
            </MenuItem>
            <MenuItem>
                    <NotificationBadge 
                        needText={true}
                    />
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p className='m-2'>Profile</p>
            </MenuItem>
        </Menu>
    );
}

export default ProfileMobileMenu;
