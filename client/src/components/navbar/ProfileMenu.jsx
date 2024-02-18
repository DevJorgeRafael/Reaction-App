// Menu.jsx
import { Menu, MenuItem, Typography } from '@mui/material';

function ProfileMenu({ anchorEl, handleMenuClose, navigate, user, handleLogout }) {
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ zIndex: 1001 }}
        >
            <MenuItem onClick={() => {
                handleMenuClose()
                navigate(`/profile/${user.username}`)
            }}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>
                <Typography color="error">Logout</Typography>
            </MenuItem>
        </Menu>
    );
}

export default ProfileMenu;
