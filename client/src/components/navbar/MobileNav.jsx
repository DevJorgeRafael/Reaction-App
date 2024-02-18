import { Box, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function MobileNav({ handleMobileMenuOpen, mobileMenuId }) {
    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <AccountCircle fontSize='large' />
            </IconButton>
        </Box>
    );
}

export default MobileNav;
