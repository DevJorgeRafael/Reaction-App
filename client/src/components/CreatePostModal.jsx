import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

export default function CreatePostModal() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        console.log(data);
        handleClose();
    };

    return (
        <>
            <AddIcon onClick={handleClickOpen} fontSize='large' />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>New Post</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent style={{ paddingTop: 0 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('title', { required: "El título es requerido" })}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('description', { required: "La descripción es requerida" })}
                        />
                        {errors.description && <p>{errors.description.message}</p>}
                        <TextField
                            margin="dense"
                            name="media"
                            type="file"
                            fullWidth
                            variant="standard"
                            {...register('media')}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Post</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
