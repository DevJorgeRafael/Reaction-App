import { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { useForm } from 'react-hook-form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Alert, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EditProfile({ user }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { updateUser, loading, 
        errors: updateErrors, 
        updateUserImage,
    } = useUser();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);

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
        data._id = user._id
        console.log(data)  
        setStatus(await updateUser(data));
        if (status === 200) {
            setOpen(false);
        }
    };

    // console.log(user)

    return (
        <>
            <Button
                variant="contained"
                onClick={ handleClickOpen }
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
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ mt: -4, mb: -1}}>
                        <TextField
                            {...register('name', { required: 'Name is required' })}
                            label="Name"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.name || updateErrors.name)}
                            helperText={errors.name?.message || updateErrors.name}
                        />

                        <TextField
                            {...register('username', { required: 'Username is required' })}
                            label="Username"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.username || updateErrors.username)}
                            helperText={errors.username?.message || updateErrors.username}
                        />

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
                            sx={{ backgroundColor: '#F3EEEA'}}
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
