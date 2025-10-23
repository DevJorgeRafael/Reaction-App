// socketContext.js
import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useUser } from "./userContext";

const SocketContext = createContext();

export const useSocket = () => {
    const socketContext = useContext(SocketContext)
    return socketContext
}

export const SocketProvider = ({ children }) => {
    const { user } = useUser()
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            // URL correcta según el entorno
            const socketUrl = import.meta.env.VITE_NODE_ENV === 'development'
                ? import.meta.env.VITE_SOCKET_URL_DEV
                : import.meta.env.VITE_SOCKET_URL_PROD;

            const newSocket = io(socketUrl, {
                query: { userId: user._id },
                transports: ['websocket', 'polling'], // Orden importante
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionAttempts: 5,
                withCredentials: true
            });

            newSocket.on('connect', () => {
                console.log('✅ Socket conectado:', newSocket.id);
            });

            newSocket.on('connect_error', (error) => {
                console.error('❌ Error de conexión socket:', error.message);
            });

            newSocket.on('disconnect', (reason) => {
                console.log('🔴 Socket desconectado:', reason);
            });

            setSocket(newSocket);

            return () => {
                console.log('🔌 Cerrando socket...');
                newSocket.close();
            };
        } else {
            // Si no hay usuario, limpiar el socket
            setSocket(null);
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};