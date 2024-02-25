import { Avatar, Box, Typography } from "@mui/material"
import { useUser } from "../../context/userContext"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { ShowMessage } from "./ShowMessage";
import { useEffect, useRef } from "react";

export default function MessagesBox({ messages }) {
    const { user } = useUser()

    const messagesByDate = messages.reduce((groups, message) => {
        const date = new Date(message.date);
        const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }

        groups[dateKey].push(message);

        return groups;
    }, {});

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <Box sx={{ px: 0.5, maxHeight: '350px', height: '350px', overflow: 'auto', mb: 1 }}>
            {Object.entries(messagesByDate).length > 0 ? Object.entries(messagesByDate).map(([date, messagesForDate], index) => (
                <Box key={index}>
                    <Typography variant="body1" color="initial" align="center">
                        {new Date(date).toLocaleDateString('en-En', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                    {messagesForDate.map((message, index) => (
                        <Box key={index} sx={{ mr: 0.5 }}>
                            <ShowMessage message={message} user={user} />
                        </Box>
                    ))}
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
            )}
            <div ref={messagesEndRef} />
        </Box>
    )
}
