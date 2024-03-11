import { IconButton, Typography } from '@mui/material';

function Logo({ navigate }) {
    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => navigate('/')}
            >
                <img src="/ReactiOn-logo.png" alt="Logo" width="50" height="50" />
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/posts')}
            >
                ReactiOn
            </Typography>
        </>
    );
}

export default Logo;
