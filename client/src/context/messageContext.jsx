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
                setChats(chats)
            });

            socket.on('read_message', (message) => {
                setMessages(prevMessages => prevMessages.map(m =>
                    m._id === message._id ? message : m));

                setChats(prevChats => prevChats.map(chat =>
                    chat.lastMessage._id === message._id ? { ...chat, lastMessage: message } : chat));
            });

            socket.on('chat_messages', (messages) => {
                setMessages(messages);

                messages.forEach(message => {
                    if (message && message.receiver && !message.read && message.receiver._id === user._id) {
                        socket.emit('read_message', { messageId: message._id });
                    }
                })
            });

            socket.on('message', (message) => {
                console.log('📨 Nuevo mensaje recibido:', message);
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        return () => {
            if (socket) {
                socket.off('chats');
                socket.off('read_message');
                socket.off('chat_messages');
                socket.off('message');
            }
        };
    }, [user, socket]);

    const sendMessage = (receiverId, content) => {
        console.log('📤 Enviando mensaje:', { senderId: user._id, receiverId, content });

        // Crear mensaje temporal
        const tempMessage = {
            _id: `temp-${Date.now()}`,
            sender: user, // Usa el objeto user completo del contexto
            receiver: { _id: receiverId },
            content: content,
            read: false,
            date: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        // ✨ Agregar inmediatamente
        setMessages(prevMessages => [...prevMessages, tempMessage]);

        socket.emit('send_message', {
            senderId: user._id,
            receiverId,
            content
        });

        // El socket.on('message') se encargará de actualizar cuando llegue del servidor
        // pero el usuario ya ve su mensaje
    };

    const getChatMessages = (userProfile) => {
        console.log('📥 Obteniendo mensajes del chat con:', userProfile._id);
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