import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputIcon from '@mui/icons-material/Input';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useUser } from '../context/userContext';
import CreatePostModal from './posts/CreatePostModal';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Logo from './navbar/Logo'
import HomeButton from './navbar/HomeButton';
import SearchBar from './navbar/SearchBar';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import ProfileMenu from './navbar/ProfileMenu';
import ProfileMobileMenu from './navbar/ProfileMobileMenu';
import AuthButtons from './navbar/AuthButtons';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showNavbar, setShowNavbar] = React.useState(true);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { user, logout } = useUser();
    const navigate = useNavigate()

    const handleLogout = () => {
        handleMenuClose()
        handleMobileMenuClose()
        logout();
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    let lastScrollTop = 0;

    React.useEffect(() => {
        const handleScroll = () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setShowNavbar(false);  
            } else {
                setShowNavbar(true); 
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <Box sx={{
            flexGrow: 1,
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 1000,
            transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.25s ease-in-out' 
        }}>
            <AppBar position="static" sx={{ backgroundColor: '#294B29' }}>
                {user ?
                    (<Toolbar>
                        <Logo navigate={ navigate } />
                        <HomeButton navigate={ navigate } />
                        <SearchBar />

                        <Box sx={{ flexGrow: 1 }} />
                        <CreatePostModal />

                        <DesktopNav handleProfileMenuOpen={handleProfileMenuOpen} menuId={menuId} />
                        <MobileNav handleMobileMenuOpen={handleMobileMenuOpen} mobileMenuId={mobileMenuId} />

                    </Toolbar>) : (
                        <>
                            <Toolbar>            
                                <AuthButtons />
                            </Toolbar>
                        </>
                    )}
            </AppBar>
            <ProfileMenu
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                navigate={navigate}
                user={user}
                handleLogout={handleLogout}
            />
            <ProfileMobileMenu
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                handleMobileMenuClose={handleMobileMenuClose}
                handleProfileMenuOpen={handleProfileMenuOpen}
            />
        </Box>
    );
}
