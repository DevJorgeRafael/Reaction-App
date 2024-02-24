import { Avatar, Box, Typography } from "@mui/material"
import { useUser } from "../../context/userContext"
import ModeCommentIcon from '@mui/icons-material/ModeComment';

export default function MessagesBox({ messages }) {
    const { user } = useUser()

    return (
        <Box sx={{ px: 0.5, maxHeight: '350px', height: '350px', overflow: 'auto', mb: 1 }}>

            {messages.length > 0 ? messages.map((message, index) => (
                <Box key={index} sx={{mr: 0.5}}>
                    {message.sender._id === user._id ? (
                        <Box sx={{
                            display: 'flex',

                            justifyContent: 'flex-end',
                            gap: 1,
                            marginBottom: 0.5,
                        }}>
                            <Box sx={{
                                backgroundColor: '#99BC85',
                                p: 0.75, borderRadius: '10px 0px 10px 10px',
                                maxWidth: '65%',
                                wordWrap: 'break-word',
                            }}>
                                <Typography variant="body1" color="initial">
                                    {message.content}
                                </Typography>
                            </Box>
                            {/* <Box>
                                <Avatar src={message.sender.image?.url} alt={message.sender.username} sx={{
                                    width: 35,
                                    height: 35,

                                }} />
                            </Box> */}
                        </Box>


                    ) : (
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            marginBottom: 0.5,
                        }}>
                            <Box>
                                <Avatar src={message.sender.image?.url} alt={message.sender.username} sx={{
                                    width: 35,
                                    height: 35,
                                }} />
                            </Box>
                            <Box sx={{
                                backgroundColor: '#E5E5EA',
                                p: 0.75, borderRadius: '0px 10px 10px 10px',
                                maxWidth: '65%',
                                wordWrap: 'break-word',
                            }}>
                                <Typography variant="body1" color="initial">
                                    {message.content}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            )) : (
                    <Box sx={{
                        height: '98%', padding: 3,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: theme => theme.palette.grey[200],
                        borderRadius: 1
                    }}>
                        <ModeCommentIcon color="disabled" style={{ fontSize: 100 }} />
                        <Typography variant="h5" color="initial" align="center">
                            No messages yet
                        </Typography>
                    </Box>
                )

            }
        </Box>
    )
}

