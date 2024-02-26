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
                console.log(chats)
                setChats(chats)
            });

            socket.on('message', (message) => {
                setMessages(prevMessages => [message, ...prevMessages]);
            });

            socket.on('read_message', (message) => {
                setMessages(prevMessages => prevMessages.map(m =>
                    m._id === message._id ? message : m));
            })
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user, socket]);

    const sendMessage = (receiverId, content) => {
        socket.emit('send_message', { sender: user._id, receiver: receiverId, content });
    };

    const readMessage = (messageId) => {
        socket.emit('read_message', messageId);
    }

    return (
        <MessageContext.Provider value={{
            chats,
            sendMessage,
            readMessage
        }}>
            {children}
        </MessageContext.Provider>
    )
}
