import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { useSocket } from '../../context/socketContext';

function MessageButton({ userProfile, user }) {
    const [open, setOpen] = useState(false);
    const socket = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (open) {
            socket.emit('get_messages', { userId1: user._id, userId2: userProfile._id });
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            socket.emit('get_messages', { userId1: user._id, userId2: userProfile._id });
        }

        socket.on('messages', (messages) => {
            setMessages(messages);
        });

        return () => {
            socket.off('messages');
        };
    }, [open]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = (value) => {
        setMessages([...messages, { sender: user.username, content: value }]);
        socket.emit('send_message', { senderId: user._id, receiverId: userProfile._id, content: value });
    };

    console.log(messages)

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


            <Dialog open={open} onClose={handleClose} sx = {{width: '100%', height: '100%'}}>
                <Box sx={{width: '300px', p: 1}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Avatar alt={userProfile.username} src={userProfile.image?.url}
                            sx={{
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                            }}
                        />
                        <Box sx={{ml: 1}}>
                            <Typography variant="body1" color="initial">@{userProfile?.username}</Typography>
                            <Typography variant="body2" color="gray">{userProfile?.name}</Typography>
                        </Box>

                    </Box>
                    <MessageList sx={{ maxHeight: '300px', overflowY: 'auto', height: '300px', display: 'flex'}}>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                model={{
                                    message: message.content,
                                    sentTime: "just now",
                                    sender: message.sender.username,
                                }}
                                sx={{
                                    alignSelf: message.sender._id === user._id ? 'flex-end' : 'flex-start',
                                }}
                            />
                        ))}
                    </MessageList>

                    <MessageInput
                        placeholder="Type message here"
                        onSend={handleSend}
                        sx={{
                            '.send-button': {
                                display: 'none',
                            },
                        }}
                    />

                </Box>
            </Dialog>
        </div>
    );
}

export default MessageButton;
