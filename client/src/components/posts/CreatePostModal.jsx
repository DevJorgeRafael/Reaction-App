import { useState, useRef, useCallback, useEffect } from 'react';
import { usePosts } from '../../context/postContext';
import { useUser } from '../../context/userContext';
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogTitle, 
    DialogContent, TextField, DialogActions, 
    IconButton, Alert, Box } from '@mui/material';
import { toast } from 'react-hot-toast'
import Webcam from "react-webcam";
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CameraIcon from '@mui/icons-material/Camera'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'


export default function CreatePostModal() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
    const { createPost } = usePosts();
    const { user } = useUser();
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [status, setStatus] = useState(null)

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

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);

        if(data.description) {
            formData.append('description', data.description);
        }
        formData.append('userId', user._id);
        if (imageSrc) {
            const block = imageSrc.split(";");
            const contentType = block[0].split(":")[1];
            const realData = block[1].split(",")[1];
            const blob = b64toBlob(realData, contentType);
            formData.append('image', blob);
        }
        setStatus(await createPost(formData))
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

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                clearErrors()
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors, clearErrors]);

    useEffect(() => {
        if (status === 200){
            toast.success('Post created successfully!',
                {
                    position: "bottom-right",
                    duration: '700',
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {
                        background: "#FFFBF5"
                    }
                }
            );
        }
        setStatus(null)
    }, [status])

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                sx={{ 
                    backgroundColor: 'white', 
                    borderRadius: 1,
                    padding: 0,
                    mr: 1,
                    ':hover': {
                        backgroundColor: 'white',  
                    }
                }}
            >
                <AddIcon />
            </IconButton>

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
                            error = {Boolean(errors.title)}
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
                            label="Description (Optional)"
                            type="text"
                            fullWidth
                            variant="filled"
                            {...register('description')}
                        />
                        {errors.description && <Alert sx={{ mb: 1 }} variant="filled" severity="error">{errors.description.message}</Alert>}

                        {imageSrc ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <img src={imageSrc} alt="preview" style={{ maxWidth: '100%' }} />
                                <IconButton onClick={() => setImageSrc(null)} variant='contained' color='error' sx={{mt: 1}}>
                                    <DeleteIcon sx={{fontSize: 50}}/>
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
                        <Box display="flex" justifyContent="flex-end" width="100%">
                            <Button type='submit' variant="contained" color="primary" 
                            sx={{ mt: -3, mr: 2 }}>
                                <SendIcon/>
                            </Button>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
