import { useEffect } from "react";
import { useUser } from "../../context/userContext";
import { Avatar, Box, Typography, Badge } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ProfilesPage() {
    const navigate = useNavigate()
    const { users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0rem 1rem' }}>
            {users.map((user) => (
                <Box key={user._id} sx={{
                    display: 'flex', alignItems: 'center',
                    my: 1, pl: 1, py: 1, borderRadius: 2,
                    backgroundColor: 'white'
                }}>
                    <Badge overlap="circular" badgeContent="+" color="primary">
                        <Avatar
                            src={user.image?.url}
                            alt={user.username}
                            sx={{ height: 60, width: 60, cursor: 'pointer' }}
                            onClick={() => navigate(`/profile/${user.username}`)}
                        />
                    </Badge>
                    <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', padding: 1 }}>
                        <Typography variant="body2" color="initial">
                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1, cursor: 'pointer' }}
                                onClick={() => navigate(`/profile/${user.username}`)}
                            >
                                @{user.username}
                            </Box>
                        </Typography>
                        <Typography variant="body2" color="initial">
                            {user.name}
                        </Typography>
                        
                    </Box>
                </Box>
            ))}
        </div>
    );
}

export default ProfilesPage;
