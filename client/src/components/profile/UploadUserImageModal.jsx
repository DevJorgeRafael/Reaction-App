import { useState, useRef } from 'react';
import { useUser } from '../../context/userContext';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, TextField } from '@mui/material';
import Webcam from "react-webcam";
import { Alert } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CameraIcon from '@mui/icons-material/Camera';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';



export default function UpdateUserImageModal() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
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

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = () => {
        // Enviar la imagen seleccionada o capturada para actualizar la imagen del usuario
        console.log(imageSrc);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <PhotoCameraIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Update Profile Image</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 0 }}>
                    {imageSrc ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={imageSrc} alt="preview" style={{ maxWidth: '100%' }} />
                            <IconButton onClick={() => setImageSrc(null)} variant='contained' color='error' sx={{ mt: 1 }}>
                                <DeleteIcon sx={{ fontSize: 50 }} />
                            </IconButton>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                style={{ width: '100%', borderRadius: 3 }}
                            />
                            <IconButton
                                onClick={capture}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'gray',
                                    },
                                }}
                            >
                                <CameraIcon sx={{ fontSize: 50, color: 'black' }} />
                            </IconButton>
                        </div>
                    )}
                    <TextField
                        margin="dense"
                        name="image"
                        type="file"
                        fullWidth
                        variant="filled"
                        {...register('image')}
                        onChange={handleImageChange}
                        sx={{
                            borderRadius: 5,
                            marginTop: 0
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="flex-end" width="100%">
                        <IconButton onClick={onSubmit} variant="contained" color="primary">
                            <CheckIcon sx={{ fontSize: 50, mt: -5 }} />
                        </IconButton>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
