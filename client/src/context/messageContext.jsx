import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from '../context/userContext';
import { useSocket } from "./socketContext";

const MessageContext = createContext();

export const useMessage = () => {
    const messageContext = useContext(MessageContext);
    return messageContext;
}

export const MessageProvider = ({ children }) => {
    const { user } = useUser();
    const socket = useSocket()
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (user && socket) {
            socket.on('chats', (chats) => {
                // console.log(chats)
                setChats(chats)
            });

            socket.on('read_message', (message) => {
                setMessages(prevMessages => prevMessages.map(m =>
                    m._id === message._id ? message : m));
            })

            socket.on('chat_messages', (messages) => {
                setMessages(messages);
                console.log(messages)

                messages.forEach(message => {
                    if (message && message.receiver && !message.read && message.receiver._id === user._id) {
                        socket.emit('read_message', { messageId: message._id });
                    }
                })
            });

            socket.on('message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user, socket]);

    const sendMessage = (receiverId, content) => {
        setMessages([...messages, { sender: user, content, date: new Date() }]);
        socket.emit('send_message', { senderId: user._id, receiverId, content});
    };

    const getChatMessages = (userProfile) => {
        socket.emit('get_chat_messages', { userId1: user._id, userId2: userProfile._id });
    }

    return (
        <MessageContext.Provider value={{
            messages,
            chats,
            sendMessage,
            getChatMessages,
            setMessages
        }}>
            {children}
        </MessageContext.Provider>
    )
}
