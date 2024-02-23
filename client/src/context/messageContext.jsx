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

    useEffect(() => {
        if (user && socket) {
            socket.on('messages', (messages) => {
                setMessages(messages);
            });

            socket.on('message', (message) => {
                setMessages(prevMessages => [message, ...prevMessages]);
            });
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

    return (
        <MessageContext.Provider value={{
            messages,
            sendMessage
        }}>
            {children}
        </MessageContext.Provider>
    )
}
