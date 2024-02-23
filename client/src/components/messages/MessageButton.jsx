import { useState } from 'react';
import { Button, Dialog, TextField } from '@mui/material';

function MessageButton({ userProfile, user }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(userProfile)
    console.log(user)

    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    background: '#4F6F52',
                    '&:hover': {
                        background: '#739072',
                    },
                    '&:active': {
                        background: '#739072',
                    },
                }}
                onClick={handleClickOpen}
            >
                Message
            </Button>


            <Dialog open={open} onClose={handleClose}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Write a message"
                    type="text"
                    fullWidth
                />
                <Button onClick={handleClose}>Send</Button>
            </Dialog>
        </div>
    );
}

export default MessageButton;
