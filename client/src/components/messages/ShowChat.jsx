import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Avatar, Box, Button, Dialog, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MessagesBox from './MessagesBox';
import { useMessage } from '../../context/messageContext';

function ShowChat({ userProfile, user, open, handleClose }) {
    const { messages, sendMessage, getChatMessages } = useMessage()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (open && userProfile) {
            console.log('🔍 Cargando chat con:', userProfile.username);
            getChatMessages(userProfile);
        }
    }, [open, userProfile]);

    const onSubmit = (data) => {
        console.log('📝 Formulario enviado:', data);

        if (data.message.trim() !== '') {
            sendMessage(userProfile._id, data.message);
            reset();
        } else {
            console.warn('⚠️ Mensaje vacío, no se envía');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ width: '300px', p: 1 }}>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', marginBottom: 1,
                        borderBottom: '1px solid #E5E5EA', paddingBottom: 0.5,
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={userProfile.username} src={userProfile.image?.url}
                                sx={{
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                }}
                            />
                            <Box sx={{ ml: 1 }}>
                                <Typography variant="body1" color="initial"
                                    fontWeight={550}
                                >@{userProfile?.username}</Typography>
                                <Typography variant="body2" color="gray">{userProfile?.name}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize='large' />
                            </IconButton>
                        </Box>
                    </Box>

                    <MessagesBox messages={messages} />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                {...register('message', { required: true })}
                                placeholder="Message"
                                fullWidth
                                multiline
                                maxRows={4}
                                onKeyDown={handleKeyPress}
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                color="primary"
                                sx={{ padding: 0, margin: 0, minWidth: '40px' }}
                            >
                                <SendIcon fontSize='large' />
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Dialog>
        </div>
    );
}

export default ShowChat;