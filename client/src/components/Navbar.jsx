import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
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


export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showNavbar, setShowNavbar] = React.useState(true);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { user, logout } = useUser();
    const navigate = useNavigate()

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Función para manejar el logout
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
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
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

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
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
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

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
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <img src="/ReactiOn-logo.png" alt="Logo" width="50" height="50" />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    ReactiOn
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button 
                                    startIcon={<InputIcon />} style={{ color: 'white', padding: '10px' }}
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </Button>
                                <Button 
                                startIcon={<PersonAddIcon />} style={{ color: 'white', padding: '10px' }}
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up
                                </Button>

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
