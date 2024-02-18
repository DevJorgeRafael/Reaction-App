import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function HomeButton({ navigate }) {
    return (
        <IconButton aria-label="" onClick={() => navigate('/posts')} sx={{
            color: 'white',
            // background
            padding: 0,
            mr: 1,
            ml: -2,
            display: {
                sx: 'block',
                sm: 'none'
            }
        }}>
            <HomeIcon fontSize='large' />
        </IconButton>
    );
}

export default HomeButton;
