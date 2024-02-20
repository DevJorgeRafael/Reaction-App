import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

function AuthButtons() {
    const navigate = useNavigate();
    return (
        <>
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
        </>
    );
}

export default AuthButtons;
