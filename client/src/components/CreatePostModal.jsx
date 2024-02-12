import { useState, useRef, useCallback } from 'react';
import { usePosts } from '../context/postContext';
import { useUser } from '../context/userContext';
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, Alert } from '@mui/material';
import Webcam from "react-webcam";

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'


export default function CreatePostModal() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createPost } = usePosts();
    const { user } = useUser();
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImageSrc(null);
    };

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImageSrc(imageSrc);
        },
        [webcamRef]
    );

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('userId', user._id);
        if (imageSrc) {
            const block = imageSrc.split(";");
            const contentType = block[0].split(":")[1];
            const realData = block[1].split(",")[1];
            const blob = b64toBlob(realData, contentType);
            formData.append('image', blob);
        }
        console.log(formData);
        createPost(formData);
        handleClose();
    };

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    return (
        <>
            <AddIcon onClick={handleClickOpen} fontSize='large' />
            <Dialog open={open} onClose={handleClose} >
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
                            variant="filled"
                            {...register('title', { required: "The title is required" })}
                        />
                        {errors.title && <Alert sx={{ mb: 1 }} variant="filled" severity="error">{errors.title.message}</Alert>}

                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="filled"
                            {...register('description', { required: "The description is required" })}
                        />
                        {errors.description && <Alert sx={{ mb: 1 }} variant="filled" severity="error">{errors.description.message}</Alert>}

                        {imageSrc ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <img src={imageSrc} alt="preview" style={{ maxWidth: '100%' }} />
                                <Button onClick={() => setImageSrc(null)} variant='contained' color='error' sx={{mt: 1}}>
                                    <DeleteIcon />
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '100%', borderRadius: 3 }}
                                />
                                <Button onClick={capture} variant='contained' color='success' sx={{mt: 1}}>
                                    <PhotoCameraIcon />
                                </Button>

                                <TextField
                                    margin="dense"
                                    name="image"
                                    type="file"
                                    fullWidth
                                    variant="filled"
                                    {...register('image')}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImageSrc(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    sx={{
                                        borderRadius: 5
                                    }}
                                />
                            </div>
                        )}

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant='contained'>
                            <SendIcon />
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
