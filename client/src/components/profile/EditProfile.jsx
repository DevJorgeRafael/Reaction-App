import { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { useForm } from 'react-hook-form';
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    TextField, Typography,
    Alert, CircularProgress,
    IconButton, Badge,
    Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function EditProfile({ user }) {
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm();
    const { updateUser, loading,
        errors: updateErrors,
        deleteUserImage, checkUsername
    } = useUser();
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('')
    const [usernameInput, setUsernameInput] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('username', user.username);
            setValue('email', user.email);
            if (user.bio) setValue('bio', user.bio);
        }
    }, [user, setValue]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        if (isCheckingUsername) return

        data._id = user._id
        let statusRequest = await updateUser(data)
        if (statusRequest === 200) {
            navigate(`/profile/${data.username}`);
        }
    };

    const controlUsernameInput = async (data) => {
        setIsCheckingUsername(true);
        setUsernameInput(data);

        if (data.length < 3){
            setError('username', { type: 'manual', message: 'Username must be at least 3 characters long' });
            setSuccessMessage('');
            setIsCheckingUsername(false);
            return;
        }

        const pattern = /^[A-Za-z0-9_-]+$/;
        if (!pattern.test(data)) {
            setError('username', { type: 'manual', message: 'Username can only contain uppercase and lowercase letters, numbers, hyphens, and underscores' });
            setSuccessMessage('');
            setIsCheckingUsername(false);
            return;
        }

        let response = await checkUsername(data)

        if (response === 204) {
            setError('username', { type: 'manual', message: '' })
            setSuccessMessage('Username available');
        } else if (response === 200) {
            if (data !== user.username) setError('username', { type: 'manual', message: 'Username already exists' })
            else setError('username', { type: 'manual', message: '' })
            setSuccessMessage('');
        }
        setIsCheckingUsername(false);
    }


    const handleDeleteUserImage = async (userId) => {
        await deleteUserImage(userId);
        setOpen(false);
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    background: '#4F6F52',
                    '&:hover': {
                        background: '#739072',
                    },
                    '&:active': {
                        background: '#739072',
                    },
                }}
            >
                Edit Profile
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center'
                }}>
                    Edit Profile
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ mt: -4, mb: -1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar alt={user.username} src={user.image?.url}
                                    sx={{
                                        justifyContent: 'center',
                                        width: 150,
                                        height: 150,
                                    }}
                                />
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        user.image?.url &&
                                        <IconButton onClick={ () => handleDeleteUserImage(user._id) }>
                                            <DeleteIcon sx={{ color: '#FF6868', fontSize: '40px' }} />
                                        </IconButton>
                                    }
                                    sx={{ position: 'absolute', bottom: 0, right: '50%', transform: 'translateX(50%)' }}
                                />
                            </Box>
                        </Box>

                        <TextField
                            {...register('name', { required: 'Name is required' })}
                            label="Name"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.name || updateErrors.name)}
                            helperText={errors.name?.message || updateErrors.name}
                        />

                        <TextField
                            {...register('username', { required: 'Username is required'})}
                            label="Username"
                            fullWidth
                            margin="normal"
                            error={Boolean((errors.username || updateErrors.username) && !successMessage && usernameInput !== user.username)}
                            helperText={errors.username?.message || updateErrors.username}
                            onBlur={async (e) => {
                                await controlUsernameInput(e.target.value);
                                setValue('username', e.target.value);
                            }}
                            onChange={async (e) => {
                                await controlUsernameInput(e.target.value);
                                setValue('username', e.target.value);
                            }}
                        />
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}

                        <TextField
                            {...register('email', { required: 'Email is required' })}
                            label="Email"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.email || updateErrors.email)}
                            helperText={errors.email?.message || updateErrors.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ backgroundColor: '#F3EEEA' }}
                        />

                        <TextField
                            {...register('bio')}
                            label="Bio"
                            fullWidth
                            margin="normal"
                            placeholder={!user.bio && 'You have not set a bio yet.' || ''}
                            error={Boolean(errors.bio || updateErrors.bio)}
                            helperText={errors.email?.message || updateErrors.email}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error" variant="contained">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant='contained'>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
