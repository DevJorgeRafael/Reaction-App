import { useEffect, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, Popover, Box, Dialog } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShowChat from '../messages/ShowChat';
import { ShowLastMessage } from '../messages/ShowLastMessage';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/messageContext';
import { useUser } from '../../context/userContext';

function MessageBadge({ needText }) {
    const { user } = useUser()
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [localChats, setLocalChats] = useState([])
    const [unreadChats, setUnreadChats] = useState(0);
    const [selectedChat, setSelectedChat] = useState(null)
    const { chats } = useMessage()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleCloseModal = () => {
        setSelectedChat(null);
    };

    useEffect(() => {
        setLocalChats(chats);
    }, [chats]);

    useEffect(() => {
        const unreadCount = localChats.filter(chat =>
            !chat.lastMessage.read && chat.lastMessage.sender._id !== user._id
        ).length;
        setUnreadChats(unreadCount);
    }, [localChats, unreadChats]);


    // console.log(chats)

    return (
        <>
            <IconButton
                size="large"
                color="inherit"
                onClick={handleClick}
                sx={{ borderRadius: 0 }}
            >
                <Badge badgeContent={unreadChats} color="error">
                    <ChatBubbleIcon />
                </Badge>
                {needText && <Typography variant="body1" sx={{ ml: 2 }}>Messages</Typography>}
            </IconButton>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" color="initial"
                            sx={{ p: 2 }}
                            onClick={handleClose}
                        >Messages</Typography>


                        {localChats.length > 0 &&
                            <>
                                <IconButton onClick={handleMenuClick} >
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    {unreadChats > 0 &&
                                        <MenuItem onClick={() => console.log('mark all as read')}>
                                            Mark all as read
                                        </MenuItem>}

                                    {/* <MenuItem onClick={() => console.log('delete all messages')}
                                        sx={{ color: theme => theme.palette.error.main }}
                                    >
                                        Delete all messages
                                    </MenuItem> */}

                                </Menu>
                            </>}
                    </Box>
                    {localChats.length > 0 ? (
                        localChats.map((chat, index) => (
                            <Box key={index}
                                sx={{
                                    width: '400px'
                                }}
                            >
                                <ShowLastMessage lastMessage={chat.lastMessage}/>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            height: 400, padding: 3,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'column',
                            backgroundColor: theme => theme.palette.grey[300]
                        }}>
                            <NotificationsOffIcon color="disabled" style={{ fontSize: 100 }} />
                            <Typography variant="h6">You don't have any messages yet.</Typography>
                        </Box>
                    )}

                </Box>
            </Popover>
        </>
    );
}

export default MessageBadge;
